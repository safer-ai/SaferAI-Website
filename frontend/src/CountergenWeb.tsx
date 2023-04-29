import React, { useState } from "react";
import "./CountergenApp.css";
import DataAugmentation from "./countergenweb_sections/DataAugmentation";
import DataSelection from "./countergenweb_sections/DataSelection";
import ModelEvaluation from "./countergenweb_sections/ModelEvaluation";
import ModelEditing from "./countergenweb_sections/ModelEditing";
import { AugmentedDataset, Dataset } from "./types";
import { Container, Typography } from "@mui/material";
import { NOTEBOOK_URL, REPO_URL, api_disabled } from "./params";

const CountergenWeb = () => {
  const [dataset, setDataset] = useState<Dataset>({ samples: [] });
  const [augdataset, setAugDataset] = useState<AugmentedDataset | null>(null);

  return (
    <Container maxWidth="md">
      <h1 className="title">The CounterGen Web Tool</h1>
      <h3>
        Choose or load data, augment it, and evaluate the bias of the model of
        your choice!
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/images/explanation.svg"
          alt="explanation"
          style={{
            border: "#024564 2px solid",
            width: "calc(min(100%, 35em))",
          }}
        ></img>
      </div>
      <p>
        If you use sensitive data, or if you want more flexibility, use the{" "}
        <a href={NOTEBOOK_URL}>Colab Notebook</a>, or run the{" "}
        <a href={REPO_URL}>Python module</a> locally.
      </p>
      {api_disabled && (
        <>
          <Typography
            sx={{
              color: "secondary.light",
              fontWeight: "bold",
            }}
          >
            Running the online tool isn't free and we decided to shut it down
            given the low demand for it. If you want to use this tool, please
            contact us! In the meantime, you can use the Python tool,{" "}
            <a
              href="https://github.com/safer-ai/Countergen-Website"
              target="_blank"
              rel="noreferrer"
            >
              or deploy the website yourself
            </a>
            .
          </Typography>
          <br />
        </>
      )}

      <DataSelection dataset={dataset} setDataset={setDataset} />

      <DataAugmentation
        dataset={dataset}
        augdataset={augdataset}
        setAugDataset={setAugDataset}
      />

      <ModelEvaluation augdataset={augdataset} />
      <ModelEditing />
      <p>
        <i>Your data won't be collected nor stored.</i>
      </p>
      <p>
        The code for this website and instructions to adapt it to your needs are
        freely available. For more information, visit{" "}
        <a href="https://github.com/safer-ai/Countergen-Website">
          github.com/safer-ai/Countergen-Website
        </a>
        .
      </p>
    </Container>
  );
};

export default CountergenWeb;
