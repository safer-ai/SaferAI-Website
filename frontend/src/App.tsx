import React, { useState } from "react";
import "./App.css";
import getperf from "./communication";
import ColabLink from "./components/ColabLink";

const App = () => {
  const [data, setData] = useState<string>("");

  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  return (
    <div className="container">
      <h1 className="title">Try Countergen online!</h1>
      <p>
        The code for this website and instructions to adapt it to your needs are
        freely available! Visit{" "}
        <a href="https://github.com/FabienRoger/Countergen-Website">
          github.com/FabienRoger/Countergen-Website
        </a>{" "}
        for more instructions
      </p>
      <p>
        More functionnallities are available if you use the <ColabLink>Google Colab version</ColabLink> of this tool.
      </p>
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
        <button
          onClick={() =>
            getperf(input, output).then((data) => setData(JSON.stringify(data)))
          }
        >
          Get perf!
        </button>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default App;
