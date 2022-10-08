import React, { useState } from "react";
import "./CountergenApp.css";
import DataAugmentation from "./countergenweb_sections/DataAugmentation";
import DataSelection from "./countergenweb_sections/DataSelection";
import ModelEvaluation from "./countergenweb_sections/ModelEvaluation";
import ModelEditing from "./countergenweb_sections/ModelEditing";
import { AugmentedDataset, Dataset } from "./types";
import { Container } from "@mui/material";
import { NOTEBOOK_URL, REPO_URL } from "./params";

const CountergenWeb = () => {
  const [dataset, setDataset] = useState<Dataset>({ samples: [] });
  const [augdataset, setAugDataset] = useState<AugmentedDataset | null>(null);

  return (
    <Container maxWidth="md">
      <h1 className="title">The Countergen Web Tool</h1>
      <h3>
        Choose or load data, augment it, and evaluate the model of your choice!
      </h3>
      <p>
        If you use sensitive data, or if you want more flexibility, use the{" "}
        <a href={NOTEBOOK_URL}>Colab Notebook</a>, or run the{" "}
        <a href={REPO_URL}>Python module</a> locally.
      </p>

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
        <a href="https://github.com/FabienRoger/Countergen-Website">
          github.com/FabienRoger/Countergen-Website
        </a>
        .
      </p>
    </Container>
  );
};

export default CountergenWeb;
