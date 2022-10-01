import { AugmentedDataset, SampleWithVariations } from "./../types";
import { Dataset, Sample } from "../types";

const backend_url = process.env.REACT_APP_COUNTERGEN_BACK_URL ?? "";

export const getDefaultDataset = async (
  name: string
): Promise<Dataset | undefined> => {
  const response = await fetch(backend_url + "/get_default_ds/" + name);
  console.log(response);
  const data = await response.json();
  const samples = data as Sample[];
  return { samples: samples };
};

export const simpleAugment = async (
  ds: Dataset,
  augmenterName: string
): Promise<AugmentedDataset | undefined> => {
  const response = await fetch(
    backend_url + "/augment/simple/" + augmenterName,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ds.samples),
    }
  );
  const data = await response.json();
  const samples = data as SampleWithVariations[];
  return { samples: samples };
};

export const simpleEvaluate = async (
  augds: AugmentedDataset,
  modelName: string
) => {
  const response = await fetch(backend_url + "/evaluate/simple/" + modelName, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(augds.samples),
  });
  const data = await response.json();
  return data;
};

export const sendAPIEvaluate = async (
  augds: AugmentedDataset,
  modelName: string,
  apiKey: string,
  apiURL: string
) => {
  const response = await fetch(backend_url + "/evaluate/sendapi/" + modelName, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: augds.samples,
      apiconfig: {
        key: apiKey,
        base_url: apiURL,
      },
    }),
  });
  const data = await response.json();
  return data;
};
