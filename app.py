import json
from flask import Flask, render_template, send_file, request
import os
import requests
from flask_cors import CORS
from countergen.evaluation import get_evaluator_for_generative_model, api_to_generative_model
from countergen.augmentation.data_augmentation import (
    SampleWithVariations,
    AugmentedDataset,
    Dataset,
    default_dataset_paths,
)
from countergen.augmentation import SimpleAugmenter
import sys

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
CORS(app)

evaluator = get_evaluator_for_generative_model(api_to_generative_model())


@app.route("/")
def main():
    return send_file(__file__[:-6] + "frontend/build/index.html")


def load_sent_ds():
    data = request.json
    samples = []
    for d in data:
        samples.append(SampleWithVariations.from_json_dict(d))
    return Dataset(samples)


@app.route("/get_default_ds/<name>", methods=["GET"])
def get_default_ds(name):
    if name not in default_dataset_paths:
        return ""
    ds = Dataset.from_default(name)
    r = []
    for sample in ds.samples:
        r.append({"input": sample.input, "expected_outputs": sample.expected_output})
    return json.dumps(r)


@app.route("/augment/simple/<name>", methods=["POST"])
def augment_simple(name):
    ds = load_sent_ds()
    augds = ds.augment([SimpleAugmenter.from_default(name)])
    r = []
    for sample in augds.samples:
        r.append(sample.to_json_dict())
    return json.dumps(r)


@app.route("/isthereinternet")
def isthereinternet():
    url = "http://www.kite.com"
    timeout = 5
    try:
        _ = requests.get(url, timeout=timeout)
        return "Connected to the Internet"
    except (requests.ConnectionError, requests.Timeout):
        return "No"


@app.route("/get_perf", methods=["POST"])
def get_perf():
    data = request.json
    return str(evaluator(data["input"], [data["output"]]))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", threaded=True, port=port, debug=True)
