import { Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { AugmentedDataset } from "../types";
import { sendAPIEvaluate, simpleEvaluate } from "../utils/communication";
import { Card, CardHeader, CardContent } from "@mui/material";
import { dsIsReadyToEvaluate } from "../utils/dsUtils";
import WaitableButton from "../components/WaitableButton";

type ModelEvaluationProps = {
  augdataset: AugmentedDataset | null;
};

const ModelEvaluation = (props: ModelEvaluationProps) => {
  const { augdataset } = props;
  const [result, setResult] = useState<any | null>(null);
  const [useAPI, setUseAPI] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiURL, setApiURL] = useState<string>("https://api.openai.com/v1");
  const [waiting, setWaiting] = useState<boolean>(false);
  const modelName = "text-ada-001"; // or text-babbage-001 or text-curie-001 or anything if useAPI

  const evaluate = () => {
    setWaiting(true);
    if (augdataset === null) return;
    if (useAPI) {
      sendAPIEvaluate(augdataset, modelName, apiKey, apiURL).then(
        (data: any) => {
          setResult(data);
          setWaiting(false);
        }
      );
    } else {
      simpleEvaluate(augdataset, modelName).then((data: any) => {
        setResult(data);
        setWaiting(false);
      });
    }
  };
  const augdsReady = augdataset !== null;
  return (
    <Card className="section">
      <CardHeader className="section-title" title="Evaluate the model" />
      <CardContent className="section-content">
        <div>
          <p>
            <Checkbox
              checked={useAPI}
              onChange={(e) => setUseAPI(e.target.checked)}
              name="Use your own API key and URL"
            />
            Use your own API key and URL
          </p>
          {useAPI && (
            <>
              <TextField
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                label="API key"
              />

              <TextField
                value={apiURL}
                onChange={(e) => setApiURL(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                label="API URL"
              />
            </>
          )}
        </div>
        <WaitableButton
          text={"Evaluate!"}
          onClick={evaluate}
          disabled={!augdsReady || !dsIsReadyToEvaluate(augdataset).ready}
          waiting={waiting}
          expectedTime={"a few minutes"}
        />
      </CardContent>
      <CardContent className="section-result">
        {result !== null && <p>{JSON.stringify(result)}</p>}
      </CardContent>
    </Card>
  );
};

export default ModelEvaluation;
