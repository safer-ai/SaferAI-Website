import React, { useState } from "react";
import "../App.css";
import { Dataset } from "../types";

type DataSelectionProps = {
  dataset: Dataset;
  setDataset: (ds: Dataset) => void;
};

const DataSelection = (props: DataSelectionProps) => {
  const { dataset, setDataset } = props;
  return (
    <div className="section">
      <div className="section-title">Choose your data</div>
      <div className="section-content">
        <p>Wow so much choice</p>
        <p>And there is more</p>
      </div>
      <div className="section-result">50 things loaded</div>
    </div>
  );
};

export default DataSelection;
