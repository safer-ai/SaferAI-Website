import { AugmentedDataset } from "../../types";
import { addBeginSpace, stripEndSpace, stripBeginSpace } from "./textUtils";
import { Dataset, Outputs, Sample } from "../../types";
import { MAX_SAMPLES, MIN_OUTPUTS, MIN_SAMPLES } from "./parameters";
import { ReadyState } from "../../components/Ready";

// To human friendly (without spaces)
const cleanOutputs = (output: Outputs): Outputs => {
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
const formatOutputs = (output: Outputs): Outputs => {
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

export const dsIsReadyToAugment = (ds: Dataset): ReadyState => {
  const numberOfInputs = ds.samples.length;
  const numberOfOutputs = ds.samples.reduce(
    (prev, sample) => prev + sample.outputs.length,
    0
  );

  if (numberOfInputs < MIN_SAMPLES || numberOfOutputs < MIN_OUTPUTS) {
    return {
      ready: false,
      message: "Not enough inputs.",
    };
  }

  if (numberOfInputs > MAX_SAMPLES) {
    return {
      ready: false,
      message: "Too many inputs. Please use the notebook.",
    };
  }

  return {
    ready: true,
    message: "Ready to augment!",
  };
};

export const dsIsReadyToEvaluate = (ds: AugmentedDataset): ReadyState => {
  const numberOfVariations = ds.samples.reduce(
    (prev, sample) => prev + sample.variations.length,
    0
  );

  if (numberOfVariations < MIN_SAMPLES) {
    return {
      ready: false,
      message: "Not enough variations.",
    };
  }

  if (numberOfVariations > MAX_SAMPLES) {
    return {
      ready: false,
      message: "Too many variations. Please use the notebook.",
    };
  }

  return {
    ready: true,
    message: "Ready to evaluate!",
  };
};
