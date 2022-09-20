import { addBeginSpace, stripEndSpace } from "./textUtils";
import { Dataset, Output, Sample } from "../types";

const cleanOutputs = (output: Output): Output => {
  return output
    .map((o: string) => addBeginSpace(o)) // Add a space at the beginning if there's none
    .filter((o: string) => o.length > 1); // Can't contain only a space
};

export const cleanDataset = (ds: Dataset): Dataset => {
  const { samples } = ds;
  const newSamples: Sample[] = samples
    .map((sample) => {
      return {
        input: stripEndSpace(sample.input),
        outputs: cleanOutputs(sample.outputs),
      };
    })
    .filter((sample) => sample.input.length > 0 && sample.outputs.length > 0);
  return { samples: newSamples };
};
