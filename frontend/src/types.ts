export type Input = string;
export type Output = string[];

export type Performance = number;
export type ModelEvaluator = (input: Input, output: Output) => Performance;

export type Category = string;

export type Sample = {
  input: string;
  expected_outputs: string[];
};
export type Dataset = { samples: Sample[] };

export type Variation = { text: Input; categories: Category[] };
export type SampleWithVariations = {
  input: Input;
  expected_output: Output;
  variations: Variation[];
};
export type AugmentedDataset = { samples: SampleWithVariations[] };
