import { Button } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { AugmentedDataset } from "../types";
import { simpleEvaluate } from "../utils/communication";
import { Card, CardHeader, CardContent } from "@mui/material";

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
  const augdsReady = augdataset !== null;
  return (
    <Card className="section">
      <CardHeader className="section-title" title="Evaluate the model" />
      <CardContent className="section-content">
        <Button onClick={evaluate} disabled={!augdsReady}>
          Evaluate!
        </Button>
        {/* <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable> */}
      </CardContent>
      <CardContent className="section-result">
        {result !== null && <p>{JSON.stringify(result)}</p>}
      </CardContent>
    </Card>
  );
};

export default ModelEvaluation;
