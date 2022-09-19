from flask import Flask, render_template, send_file, request
import os
import requests
from flask_cors import CORS
from countergen.evaluation import get_evaluator_for_generative_model, api_to_generative_model
import sys

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
CORS(app)

evaluator = get_evaluator_for_generative_model(api_to_generative_model())


@app.route("/")
def main():
    print("hey", __file__[:-6] + "frontend/build/index.html")
    return send_file(__file__[:-6] + "frontend/build/index.html")


@app.route("/ping")
def ping():
    url = "http://www.kite.com"
    timeout = 5
    try:
        _ = requests.get(url, timeout=timeout)
        print("Connected to the Internet")
        return "Connected to the Internet"
    except (requests.ConnectionError, requests.Timeout) as exception:
        print("No internet connection.")
        return "No"


@app.route("/get_perf", methods=["POST"])
def get_perf():
    data = request.json
    return str(evaluator(data["input"], [data["output"]]))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", threaded=True, port=port, debug=True)
