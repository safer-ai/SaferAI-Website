import { Button, Chip } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import ColabLink from "../components/ColabLink";
import Collapsable from "../components/Collapsable";
import { AugmentedDataset, Dataset, SampleWithVariations } from "../types";
import { simpleAugment } from "../utils/communication";

type DataAugmentationProps = {
  dataset: Dataset;
  augdataset: AugmentedDataset | null;
  setAugDataset: (augds: AugmentedDataset) => void;
};

const DataAugmentation = (props: DataAugmentationProps) => {
  const { dataset, augdataset, setAugDataset } = props;

  const augment = () => {
    simpleAugment(dataset, "gender").then((augds) => {
      if (augds !== undefined) setAugDataset(augds);
    });
  };

  return (
    <div className="section">
      <div className="section-title">Augment the data</div>
      <div className="section-content">
        <Button onClick={augment}>Augment!</Button>
        {/* <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable> */}
      </div>
      <div className="section-result">
        {augdataset !== null &&
          augdataset.samples.map((s: SampleWithVariations) => {
            return (
              <div className="variation-holder">
                {s.variations.map((v) => (
                  <p>
                    {v.text}
                    {v.categories.map((c) => (
                      <Chip label={c} variant="outlined" />
                    ))}
                  </p>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DataAugmentation;
