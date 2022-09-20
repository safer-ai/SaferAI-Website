import React, { useState } from "react";
import "../App.css";
import { AugmentedDataset, Dataset } from "../types";

type DataAugmentationProps = {
  dataset: Dataset;
  augdataset: AugmentedDataset | null;
  setAugDataset: (augds: AugmentedDataset) => void;
};

const DataAugmentation = (props: DataAugmentationProps) => {
  const { dataset, augdataset, setAugDataset } = props;
  return (
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
  );
};

export default DataAugmentation;
