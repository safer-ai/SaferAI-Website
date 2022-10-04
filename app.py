import json
import os
from typing import Any, Iterable, Mapping

import countergen
import countergen.config
import requests
from countergen import (
    DEFAULT_CONVERTERS_PATHS,
    DEFAULT_DS_PATHS,
    AugmentedDataset,
    Dataset,
    Sample,
    SimpleAugmenter,
    api_to_generative_model,
    get_generative_model_evaluator,
    compute_performances,
)
from countergen.augmentation.data_augmentation import SampleWithVariations
from countergen.tools.api_utils import ApiConfig
from countergen.types import AugmentedSample, ModelEvaluator
from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

application = Flask(__name__, static_url_path="", static_folder="frontend/build")
CORS(application)

MAX_SAMPLES = 200


@application.route("/")
def main():
    return send_file(__file__[:-6] + "frontend/build/index.html")


@application.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e

    print(e)
    return {"error": "Error 500: internal error"}, 500


@application.route("/get_default_ds/<name>", methods=["GET"])
def get_default_ds(name):
    """Excepts doublebind or tiny-test."""

    if name not in ["doublebind", "tiny-test", "male-stereotypes", "female-stereotypes"]:
        return json.dumps({"error": "wrong dataset name", "data": name})

    ds = Dataset.from_default(name)
    r = []
    for sample in ds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


def load_sent_ds(data: Mapping[str, Any]):
    samples = []
    for d in data:
        samples.append(Sample.from_json_dict(d))
    return Dataset(samples)


@application.route("/augment/simple/<name>", methods=["POST"])
def augment_simple(name):
    """name is either 'gender' or 'west_v_asia' (switch names white vs asia)"""
    if name not in DEFAULT_CONVERTERS_PATHS:
        return json.dumps({"error": "wrong augmenter name", "data": name})

    ds = load_sent_ds(request.json)

    if len(ds.samples) > MAX_SAMPLES:
        return json.dumps({"error": "too many samples", "data": len(ds.samples)})

    augds = ds.augment([SimpleAugmenter.from_default(name)])
    r = []
    for sample in augds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


@application.route("/augment/multiple", methods=["POST"])
def augment_multiple():
    """name is either 'gender' or 'west_v_asia' (switch names white vs asia)"""

    converter_names = request.json["names"]

    if any(name not in DEFAULT_CONVERTERS_PATHS for name in converter_names):
        return json.dumps({"error": "wrong augmenter name", "data": converter_names})

    ds = load_sent_ds(request.json["data"])

    if len(ds.samples) > MAX_SAMPLES:
        return json.dumps({"error": "too many samples", "data": len(ds.samples)})

    augds = ds.augment([SimpleAugmenter.from_default(name) for name in converter_names])
    r = []
    for sample in augds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


def load_sent_augds(data: Mapping[str, Any]):
    samples = []
    for d in data:
        samples.append(SampleWithVariations.from_json_dict(d))
    return AugmentedDataset(samples)


def evaluate_complex(samples: Iterable[AugmentedSample], model_ev: ModelEvaluator) -> str:
    performances = compute_performances(samples, model_ev)
    stats = countergen.aggregators.PerformanceStatsPerCategory()(performances)
    stats_json = {k: s.to_json_dict() for k, s in stats.items()}
    outliers = countergen.aggregators.OutliersAggregator(samples)(performances)
    return json.dumps(
        {
            "stats": stats_json,
            "outliers": outliers,
        }
    )


@application.route("/evaluate/simple/<model_name>", methods=["POST"])
def evaluate_simple(model_name="text-ada-001"):
    """Accepts only certain models any model name

    Except data like augds.samples (a list)"""

    if model_name not in ["text-ada-001", "text-babbage-001", "text-curie-001"]:
        return json.dumps({"error": "wrong model name", "data": model_name})

    ds = load_sent_augds(request.json)

    if len(ds.samples) > MAX_SAMPLES:
        return json.dumps({"error": "too many samples", "data": len(ds.samples)})

    model_ev = get_generative_model_evaluator(api_to_generative_model(openai_engine=model_name), "probability")

    return evaluate_complex(ds.samples, model_ev)

    # aggregator = countergen.aggregators.PerformanceStatsPerCategory()
    # results = evaluate(ds.samples, model_ev, aggregator)
    # return json.dumps({c: f"{s.mean:.5f} +- {s.uncertainty_2sig:.5f}" for c, s in results.items()})


@application.route("/evaluate/sendapi/<model_name>", methods=["POST"])
def evaluate_sendapi(model_name="text-ada-001"):
    """Accepts any model name.

    Except data like
    {
      "data": augds.samples,
      "apiconfig": {
        "key": apiKey,
        "base_url": apiURL,
      },
    }"""
    ds = load_sent_augds(request.json["data"])

    if len(ds.samples) > MAX_SAMPLES:
        return json.dumps({"error": "too many samples", "data": len(ds.samples)})

    apiconfig = ApiConfig.from_json_dict(request.json["apiconfig"])
    apiconfig.base_url = apiconfig.base_url or countergen.config.apiconfig.base_url

    model_ev = get_generative_model_evaluator(
        api_to_generative_model(openai_engine=model_name, apiconfig=apiconfig), "probability"
    )

    return evaluate_complex(ds.samples, model_ev)

    # aggregator = countergen.aggregators.PerformanceStatsPerCategory()
    # results = evaluate(ds.samples, model_ev, aggregator)
    # return json.dumps({c: f"{s.mean:.5f} +- {s.uncertainty_2sig:.5f}" for c, s in results.items()})


@application.route("/isthereinternet")
def isthereinternet():
    url = "http://www.kite.com"
    timeout = 5
    try:
        _ = requests.get(url, timeout=timeout)
        return "Yes"
    except (requests.ConnectionError, requests.Timeout):
        return "No"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    application.run(host="0.0.0.0", threaded=True, port=port, debug=True)
