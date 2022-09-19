import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string>("");

  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const backend_url = process.env.REACT_APP_COUNTERGEN_BACK_URL ?? "";
  const getperf = () => {
    fetch(backend_url + "/get_perf", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        output: output,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(JSON.stringify(data));
      });
  };

  return (
    <div>
      <h1 className="title">Try Countergen online!</h1>
      <div className="section">
        <div className="section-title">Choose your data</div>
        <div className="section-content">
          <p>Wow so much choice</p>
          <p>And there is more</p>
        </div>
        <div className="section-result">50 things loaded</div>
      </div>

      <div className="section">
        <div className="section-title">Augment the data</div>
        <div className="section-content">
          <p>Wow so much choice</p>
          <p>And there is more</p>
        </div>
        <div className="section-result">
          <p>150 total sentence</p>
          <p>Here are some examples</p>
        </div>
      </div>
      <div className="section">
        <div className="section-title">Evaluate the model</div>
        <div className="section-content">
          <p>Wow so much choice</p>
          <p>And there is more</p>
        </div>
        <div className="section-result"></div>
      </div>
      <div className="section">
        <div className="section-title">Go further and fix the bias!</div>
        <div className="section-content">
          <p>So much editing</p>
          <p>Unbelievable</p>
        </div>
      </div>
      <div className="section">
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <input
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        ></input>
        <button onClick={getperf}>Get perf!</button>
        <p>{data}</p>
      </div>
    </div>
  );
}

export default App;
