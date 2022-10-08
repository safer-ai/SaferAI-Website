import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ResultBars from "../components/ResultBars";
import WaitableButton from "../components/WaitableButton";
import { AugmentedDataset, EvaluationReturn } from "../types";
import { sendAPIEvaluate, simpleEvaluate } from "../utils/communication";
import { dsIsReadyToEvaluate } from "../utils/dsUtils";

type ModelEvaluationProps = {
  augdataset: AugmentedDataset | null;
};

const ModelEvaluation = (props: ModelEvaluationProps) => {
  const { augdataset } = props;
  const [result, setResult] = useState<EvaluationReturn | null>(null);
  const [selectedModel, setSelectModel] = useState<string>("text-ada-001");
  const useAPI = selectedModel === "your-api";
  const [apiKey, setApiKey] = useState<string>("");
  const [apiURL, setApiURL] = useState<string>("https://api.openai.com/v1");
  const [modelName, setModelName] = useState<string>("text-ada-001");
  const [waiting, setWaiting] = useState<boolean>(false);

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
      simpleEvaluate(augdataset, selectedModel).then((data: any) => {
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
        <div
          className="horizontal-flex"
          style={{ padding: "0.5em", gap: "0.5em" }}
        >
          <p style={{ margin: 0 }}>Chose a model to evaluate</p>
          <Select
            value={selectedModel}
            label="Model"
            size="small"
            onChange={(e) => setSelectModel(e.target.value)}
          >
            <MenuItem value={"text-ada-001"}>OpenAI Ada</MenuItem>
            <MenuItem value={"text-babbage-001"}>OpenAI Babbage</MenuItem>
            <MenuItem value={"text-curie-001"}>OpenAI Curie</MenuItem>
            <MenuItem value={"your-api"}>Use your own API key and URL</MenuItem>
          </Select>
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
              <TextField
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                label="Model name"
              />
            </>
          )}
        </div>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <WaitableButton
            text={"Evaluate!"}
            onClick={evaluate}
            disabled={!augdsReady || !dsIsReadyToEvaluate(augdataset).ready}
            waiting={waiting}
            expectedTime={"a few minutes"}
            buttonParams={{ color: "secondary" }}
          />
        </div>
      </CardContent>
      <CardContent className="section-result">
        {result !== null && result !== undefined && (
          <>
            <h3 style={{ textAlign: "center" }}>Average performances</h3>
            <p>
              Here, "performance" is the probability that the model generates
              one of the outputs.
            </p>
            <ResultBars stats={result.stats} />
            <h3 style={{ textAlign: "center" }}>Outliers</h3>
            {result.outliers.map((v, i) => {
              return v.map(([inp, out, cats, perf], j) => (
                <div key={`variation-${i}-${j}`}>
                  {"perf="}
                  {perf.toPrecision(2)}
                  {" on: "}
                  {inp}
                  <ArrowForwardIcon fontSize="small" />
                  {out}
                  {cats.map((c, k) => (
                    <Chip
                      label={c}
                      variant="outlined"
                      key={`variation-chip-${i}-${k}`}
                    />
                  ))}
                </div>
              ));
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelEvaluation;
