import {
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ResultBars from "../components/ResultBars";
import WaitableButton from "../components/WaitableButton";
import { AugmentedDataset, EvaluationReturn, OutlierData } from "../types";
import { sendAPIEvaluate, simpleEvaluate } from "../utils/communication";
import { dsIsReadyToEvaluate } from "../utils/dsUtils";

type ModelEvaluationProps = {
  augdataset: AugmentedDataset | null;
};

const Outlier = (props: { outlierData: OutlierData }) => {
  const [inp, out, cats, perf] = props.outlierData;
  return (
    <div
      style={{ margin: "0.2em", padding: "0.5em", border: "#024564 1px solid" }}
    >
      <div>
        Performance: <b>{perf.toPrecision(2)}</b> on
      </div>
      <div>"{inp}"</div>
      <div>Expected outputs: {JSON.stringify(out)}</div>
      <div>Categories: {JSON.stringify(cats)}</div>
    </div>
  );
};

const ModelEvaluation = (props: ModelEvaluationProps) => {
  const { augdataset } = props;
  const [result, setResult] = useState<EvaluationReturn | null>(null);
  const [selectedModel, setSelectModel] = useState<string>("text-ada-001");
  const useAPI = selectedModel === "your-api";
  const [apiKey, setApiKey] = useState<string>("sk-...");
  const [apiURL, setApiURL] = useState<string>("https://api.openai.com/v1");
  const [modelName, setModelName] = useState<string>("text-ada-001");
  const [isApiErr, setIsApiErr] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  const processData = (data: any) => {
    if (!data || "error" in data) {
      setResult(null);
      setIsApiErr(true);
      setWaiting(false);
      return;
    }
    setResult(data);
    setWaiting(false);
  };

  const evaluate = () => {
    setWaiting(true);
    setIsApiErr(false);
    if (augdataset === null) return;
    if (useAPI) {
      sendAPIEvaluate(augdataset, modelName, apiKey, apiURL).then(
        (data: any) => {
          processData(data);
        }
      );
    } else {
      simpleEvaluate(augdataset, selectedModel).then((data: any) => {
        processData(data);
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
          <p style={{ margin: 0 }}>Choose a model to evaluate</p>
          <Select
            value={selectedModel}
            label="Model"
            size="small"
            onChange={(e) => setSelectModel(e.target.value)}
          >
            <MenuItem value={"text-ada-001"}>OpenAI Ada</MenuItem>
            <MenuItem value={"text-babbage-001"}>OpenAI Babbage</MenuItem>
            <MenuItem value={"text-curie-001"}>OpenAI Curie</MenuItem>
            <MenuItem value={"text-davinci-001"}>
              OpenAI GPT-3 (Davinci)
            </MenuItem>
            <MenuItem value={"text-davinci-002"}>OpenAI Instruct GPT</MenuItem>
            <MenuItem value={"your-api"}>Use your own API key and URL</MenuItem>
          </Select>
        </div>
        <p>We will add more models if there's interest for it!</p>
        {useAPI && (
          <>
            <div
              className="horizontal-flex"
              style={{ padding: "0.5em", gap: "0.5em" }}
            >
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
            </div>
            <Typography>
              Your API key should be the API key provided by the API provider
              you are using. The API URL is an URL given by your API provider.
              OpenAI's is <code>https://api.openai.com/v1</code> and GooseAI
              (which provides access to GPT-NeoX 20B and GPT-J) is{" "}
              <code>https://api.goose.ai/v1</code>. This URL will be fed into
              the <code>openai</code> Python module, and your API provider must
              be compatible with it. The model name is the code corresponding to
              the model you wish to use: GPT-3 is <code>text-davinci-001</code>,
              and GPT-NeoX 20B is <code>gpt-neo-20b</code>.
            </Typography>
            {isApiErr && (
              <Typography color="secondary">
                The request failed. Please use a valid key, URL and model name.
              </Typography>
            )}
          </>
        )}
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
              const [outlier1, outlier2] = v;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5em",
                  }}
                  key={`variation-${i}-${outlier1[3]}`}
                >
                  <Outlier outlierData={outlier1} />
                  <small style={{ marginTop: "3em" }}>but</small>
                  <Outlier outlierData={outlier2} />
                </div>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelEvaluation;
