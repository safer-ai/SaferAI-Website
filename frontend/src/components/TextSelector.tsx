import { Button, Input, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Dataset, Sample } from "../types";
import "./TextSelector.css";

type TextSelectorProps = {
  dataset: Dataset;
  setDataset: (ds: Dataset) => void;
};

const TextSelector = (props: TextSelectorProps) => {
  const { dataset, setDataset } = props;
  const { samples } = dataset;

  const addSample = () => {
    setDataset({
      samples: [...dataset.samples, { input: "", expected_outputs: [""] }],
    });
  };

  const setSample = (i: number, sample: Sample) => {
    const new_samples = [...samples];
    new_samples[i] = sample;
    setDataset({ samples: new_samples });
  };
  const addOutput = (i: number) => {
    setSample(i, {
      input: samples[i].input,
      expected_outputs: [...samples[i].expected_outputs, ""],
    });
  };
  const setInput = (new_value: string, i: number) => {
    setSample(i, {
      input: new_value,
      expected_outputs: samples[i].expected_outputs,
    });
  };
  const setOutput = (new_value: string, i: number, j: number) => {
    const new_output = [...samples[i].expected_outputs];
    new_output[j] = new_value;
    setSample(i, {
      input: samples[i].input,
      expected_outputs: new_output,
    });
  };

  return (
    <div className="text-selector">
      {samples.map(({ input, expected_outputs }, i) => {
        return (
          <div className="text-selector-line">
            <TextField
              key={`selector-item-input-${i}`}
              label="Input"
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value, i)}
            />
            <div className="text-selector-outputs-col">
              {expected_outputs.map((o, j) => {
                return (
                  <div className="text-selector-output-line">
                    <TextField
                      key={`selector-item-output-${i}-${j}`}
                      label="Output"
                      variant="outlined"
                      size="small"
                      value={o}
                      onChange={(e) => setOutput(e.target.value, i, j)}
                    />
                    {j === expected_outputs.length - 1 && (
                      <Button
                        onClick={() => {
                          addOutput(i);
                        }}
                      >
                        <AddIcon />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <Button onClick={addSample}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default TextSelector;
