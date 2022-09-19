from flask import Flask, render_template, send_file
import os
import requests

app = Flask(__name__, static_url_path="", static_folder="frontend/build")


@app.route("/")
def fun():
    print("hey", __file__[:-6] + "frontend/build/index.html")
    return send_file(__file__[:-6] + "frontend/build/index.html")


@app.route("/ping")
def fun():
    url = "http://www.kite.com"
    timeout = 5
    try:
        _ = requests.get(url, timeout=timeout)
        print("Connected to the Internet")
        return "Connected to the Internet"
    except (requests.ConnectionError, requests.Timeout) as exception:
        print("No internet connection.")
        return "No"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", threaded=True, port=port, debug=True)
