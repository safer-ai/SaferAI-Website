export type Input = string;
export type Outputs = string[];

export type Performance = number;
export type ModelEvaluator = (input: Input, output: Outputs) => Performance;

export type Category = string;

export type Sample = {
  input: Input;
  outputs: Outputs;
};
export type Dataset = { samples: Sample[] };

export type Variation = { text: Input; categories: Category[] };
export type SampleWithVariations = {
  input: Input;
  outputs: Outputs;
  variations: Variation[];
};
export type AugmentedDataset = { samples: SampleWithVariations[] };
