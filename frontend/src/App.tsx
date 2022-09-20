import React, { useState } from "react";
import "./App.css";
import { getperf } from "./utils/communication";
import ColabLink from "./components/ColabLink";
import DataAugmentation from "./sections/DataAugmentation";
import DataSelection from "./sections/DataSelection";
import ModelEditing from "./sections/ModelEditing";
import ModelEvaluation from "./sections/ModelEvaluation";
import { AugmentedDataset, Dataset } from "./types";

const App = () => {
  const [dataset, setDataset] = useState<Dataset>({ samples: [] });
  const [augdataset, setAugDataset] = useState<AugmentedDataset | null>(null);

  // TESTS
  const [data, setData] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  return (
    <div className="container">
      <h1 className="title">Try CounterGen online!</h1>
      <p>
        The code for this website and instructions to adapt it to your needs are
        freely available! Visit{" "}
        <a href="https://github.com/FabienRoger/Countergen-Website">
          github.com/FabienRoger/Countergen-Website
        </a>{" "}
        for more instructions
      </p>
      <p>
        If you want more flexibility, use the{" "}
        <ColabLink>Google Colab version</ColabLink> of this tool!
      </p>

      <DataSelection dataset={dataset} setDataset={setDataset} />

      <DataAugmentation
        dataset={dataset}
        augdataset={augdataset}
        setAugDataset={setAugDataset}
      />

      <ModelEvaluation augdataset={augdataset} />

      <ModelEditing />

      <div className="section">
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <input
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        ></input>
        <button
          onClick={() =>
            getperf(input, output).then((data: any) =>
              setData(JSON.stringify(data))
            )
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
