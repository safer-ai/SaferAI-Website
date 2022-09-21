import json
from flask import Flask, render_template, send_file, request
import os
import requests
from flask_cors import CORS
import countergen
from countergen import (
    get_generative_model_evaluator,
    api_to_generative_model,
    AugmentedDataset,
    Dataset,
    DEFAULT_DS_PATHS,
    SimpleAugmenter,
    api_to_generative_model,
    evaluate,
)
from countergen.augmentation.data_augmentation import Sample, SampleWithVariations
from countergen import aggregators

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
CORS(app)

evaluator = get_generative_model_evaluator(api_to_generative_model())


@app.route("/")
def main():
    return send_file(__file__[:-6] + "frontend/build/index.html")


@app.route("/get_default_ds/<name>", methods=["GET"])
def get_default_ds(name):
    if name not in DEFAULT_DS_PATHS:
        return ""
    ds = Dataset.from_default(name)
    r = []
    for sample in ds.samples:
        r.append({"input": sample.input, "outputs": sample.outputs})
    return json.dumps(r)


def load_sent_ds():
    data = request.json
    samples = []
    for d in data:
        samples.append(Sample.from_json_dict(d))
    return Dataset(samples)


@app.route("/augment/simple/<name>", methods=["POST"])
def augment_simple(name):
    ds = load_sent_ds()
    augds = ds.augment([SimpleAugmenter.from_default(name)])
    r = []
    for sample in augds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


def load_sent_augds():
    data = request.json
    samples = []
    for d in data:
        samples.append(SampleWithVariations.from_json_dict(d))
    return AugmentedDataset(samples)


@app.route("/evaluate/simple", methods=["POST"])
def evaluate_simple():
    ds = load_sent_augds()
    model_ev = get_generative_model_evaluator(api_to_generative_model(), "probability")
    aggregator = countergen.aggregators.PerformanceStatsPerCategory()
    results = evaluate(ds.samples, model_ev, aggregator)
    return json.dumps({c: f"{s.mean:.5f} +- {s.uncertainty_2sig:.5f}" for c, s in results.items()})


@app.route("/isthereinternet")
def isthereinternet():
    url = "http://www.kite.com"
    timeout = 5
    try:
        _ = requests.get(url, timeout=timeout)
        return "Yes"
    except (requests.ConnectionError, requests.Timeout):
        return "No"


@app.route("/get_perf", methods=["POST"])
def get_perf():
    data = request.json
    return str(evaluator(data["input"], [data["output"]]))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", threaded=True, port=port, debug=True)
