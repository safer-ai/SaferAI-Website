import json
import os
from typing import Any, Mapping

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
    aggregators,
    api_to_generative_model,
    evaluate,
    get_generative_model_evaluator,
)
from countergen.augmentation.data_augmentation import SampleWithVariations
from countergen.tools.api_utils import ApiConfig
from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

application = Flask(__name__, static_url_path="", static_folder="frontend/build")
CORS(application)


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

    if name not in ["doublebind", "tiny-test"]:
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
    augds = ds.augment([SimpleAugmenter.from_default(name)])
    r = []
    for sample in augds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


def load_sent_augds(data: Mapping[str, Any]):
    samples = []
    for d in data:
        samples.append(SampleWithVariations.from_json_dict(d))
    return AugmentedDataset(samples)


@application.route("/evaluate/simple/<model_name>", methods=["POST"])
def evaluate_simple(model_name="text-ada-001"):
    """Accepts only certain models any model name

    Except data like augds.samples (a list)"""

    if model_name not in ["text-ada-001", "text-babbage-001", "text-curie-001"]:
        return json.dumps({"error": "wrong model name", "data": model_name})

    ds = load_sent_augds(request.json)

    model_ev = get_generative_model_evaluator(api_to_generative_model(openai_engine=model_name), "probability")

    aggregator = countergen.aggregators.PerformanceStatsPerCategory()
    results = evaluate(ds.samples, model_ev, aggregator)
    return json.dumps({c: f"{s.mean:.5f} +- {s.uncertainty_2sig:.5f}" for c, s in results.items()})


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
    apiconfig = ApiConfig.from_json_dict(request.json["apiconfig"])
    apiconfig.base_url = apiconfig.base_url or countergen.config.apiconfig.base_url

    model_ev = get_generative_model_evaluator(
        api_to_generative_model(openai_engine=model_name, apiconfig=apiconfig), "probability"
    )

    aggregator = countergen.aggregators.PerformanceStatsPerCategory()
    results = evaluate(ds.samples, model_ev, aggregator)
    return json.dumps({c: f"{s.mean:.5f} +- {s.uncertainty_2sig:.5f}" for c, s in results.items()})


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
