export type Input = string;
export type Outputs = string[];

export type Performance = number;
export type ModelEvaluator = (input: Input, output: Outputs) => Performance;

export type Category = string;

export type Sample = {
  input: Input;
  outputs: Outputs;
  id?: number; // Used as key
};
export type Dataset = { samples: Sample[] };

export type Variation = { text: Input; categories: Category[] };
export type SampleWithVariations = {
  input: Input;
  outputs: Outputs;
  variations: Variation[];
  id?: number; // Used as key
};
export type AugmentedDataset = { samples: SampleWithVariations[] };

export type Stats = {
  mean: number;
  uncertainty_2sig: number;
};
export type OutlierData = [Input, Outputs, Category[], Performance];
export type EvaluationReturn = {
  stats: { [category: string]: Stats };
  outliers: [OutlierData, OutlierData][];
  relative?: string;
};
