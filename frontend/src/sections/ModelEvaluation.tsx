import { Button } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { AugmentedDataset } from "../types";
import { simpleEvaluate } from "../utils/communication";

type ModelEvaluationProps = {
  augdataset: AugmentedDataset | null;
};

const ModelEvaluation = (props: ModelEvaluationProps) => {
  const { augdataset } = props;
  const [result, setResult] = useState<any | null>(null);
  const evaluate = () => {
    if (augdataset !== null)
      simpleEvaluate(augdataset).then((data: any) => setResult(data));
  };
  return (
    <div className="section">
      <div className="section-title">Evaluate the model</div>
      <div className="section-content">
        <Button onClick={evaluate}>Evaluate!</Button>
        {/* <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable> */}
      </div>
      <div className="section-result">
        {result !== null && <p>{JSON.stringify(result)}</p>}
      </div>
    </div>
  );
};

export default ModelEvaluation;
