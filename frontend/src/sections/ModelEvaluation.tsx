import React, { useState } from "react";
import "../App.css";
import { AugmentedDataset } from "../types";

type ModelEvaluationProps = {
  augdataset: AugmentedDataset | null;
};

const ModelEvaluation = (props: ModelEvaluationProps) => {
  const { augdataset } = props;
  return (
    <div className="section">
      <div className="section-title">Evaluate the model</div>
      <div className="section-content">
        <p>Wow so much choice</p>
        <p>And there is more</p>
      </div>
      <div className="section-result"></div>
    </div>
  );
};

export default ModelEvaluation;
