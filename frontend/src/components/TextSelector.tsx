import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Dataset, Sample } from "../types";
import "./TextSelector.css";
import RemovableTextField from "./RemovableTextField";

type TextSelectorProps = {
  dataset: Dataset;
  setDataset: (ds: Dataset) => void;
};

const TextSelector = (props: TextSelectorProps) => {
  const { dataset, setDataset } = props;
  const { samples } = dataset;

  const addSample = () => {
    setDataset({
      samples: [...dataset.samples, { input: "", outputs: [""] }],
    });
  };

  const setSample = (i: number, sample: Sample) => {
    const newSamples = [...samples];
    newSamples[i] = sample;
    setDataset({ samples: newSamples });
  };
  const addOutput = (i: number) => {
    setSample(i, {
      input: samples[i].input,
      outputs: [...samples[i].outputs, ""],
    });
  };
  const removeSample = (i: number) => {
    setDataset({
      samples: [
        ...dataset.samples.slice(0, i),
        ...dataset.samples.slice(i + 1),
      ],
    });
  };
  const removeOutput = (i: number, j: number) => {
    setSample(i, {
      input: samples[i].input,
      outputs: [
        ...samples[i].outputs.slice(0, j),
        ...samples[i].outputs.slice(j + 1),
      ],
    });
  };

  const setInput = (newValue: string, i: number) => {
    setSample(i, {
      input: newValue,
      outputs: samples[i].outputs,
    });
  };
  const setOutput = (newValue: string, i: number, j: number) => {
    const newOutput = [...samples[i].outputs];
    newOutput[j] = newValue;
    setSample(i, {
      input: samples[i].input,
      outputs: newOutput,
    });
  };

  return (
    <div className="text-selector">
      {samples.map(({ input, outputs }, i) => {
        return (
          <div className="text-selector-line">
            <RemovableTextField
              key={`selector-item-input-${i}`}
              label="Input"
              value={input}
              setValue={(s) => setInput(s, i)}
              onDelete={() => removeSample(i)}
            />
            <div className="text-selector-outputs-col">
              {outputs.map((o, j) => {
                return (
                  <div className="text-selector-output-line">
                    <RemovableTextField
                      key={`selector-item-output-${i}-${j}`}
                      label="Outputs"
                      value={o}
                      setValue={(s) => setOutput(s, i, j)}
                      onDelete={() => removeOutput(i, j)}
                    />
                    {j === outputs.length - 1 && (
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
              {outputs.length === 0 && (
                <Button
                  onClick={() => {
                    addOutput(i);
                  }}
                >
                  <AddIcon />
                </Button>
              )}
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
