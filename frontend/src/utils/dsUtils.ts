import { addBeginSpace, stripEndSpace, stripBeginSpace } from "./textUtils";
import { Dataset, Output, Sample } from "../types";

// To human friendly (without spaces)
const cleanOutputs = (output: Output): Output => {
  return output
    .map((o: string) => stripBeginSpace(stripEndSpace(o))) // Remove the space at the beginning & end if there is one
    .filter((o: string) => o.length > 0); // Can't contain nothing
};

// To human friendly (without spaces)
export const cleanDs = (ds: Dataset): Dataset => {
  const { samples } = ds;
  const newSamples: Sample[] = samples
    .map((sample) => {
      return {
        input: stripBeginSpace(stripEndSpace(sample.input)),
        outputs: cleanOutputs(sample.outputs),
      };
    })
    .filter((sample) => sample.input.length > 0 && sample.outputs.length > 0);
  return { samples: newSamples };
};

// To machine friendly (with spaces)
const formatOutputs = (output: Output): Output => {
  return output
    .map((o: string) => addBeginSpace(stripEndSpace(o))) // Add a space at the beginning if there's none
    .filter((o: string) => o.length > 1); // Can't contain only a space
};

// To machine friendly (with spaces at the beginning of the output)
export const formatDs = (ds: Dataset): Dataset => {
  const { samples } = ds;
  const newSamples: Sample[] = samples
    .map((sample) => {
      return {
        input: stripBeginSpace(stripEndSpace(sample.input)),
        outputs: formatOutputs(sample.outputs),
      };
    })
    .filter((sample) => sample.input.length > 0 && sample.outputs.length > 0);
  return { samples: newSamples };
};
