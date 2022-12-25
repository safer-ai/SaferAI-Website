import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Button,
} from "@mui/material";
import { useState } from "react";
import Ready from "../components/Ready";
import WaitableButton from "../components/WaitableButton";
import { AugmentedDataset, Dataset, SampleWithVariations } from "../types";
import { multipleAugment } from "../utils/communication";
import { dsIsReadyToAugment, dsIsReadyToEvaluate, refreshAllIds } from "../utils/dsUtils";
import RemovableTextField from "../components/RemovableTextField";

type DataAugmentationProps = {
  dataset: Dataset;
  augdataset: AugmentedDataset | null;
  setAugDataset: (augds: AugmentedDataset) => void;
};

const DataAugmentation = (props: DataAugmentationProps) => {
  const { dataset, augdataset, setAugDataset } = props;

  const [waiting, setWaiting] = useState<boolean>(false);
  const [augmentGender, setAugmentGender] = useState<boolean>(true);
  const [augmentRace, setAugmentRace] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const augment = () => {
    let toAugment = [];
    if (augmentGender) toAugment.push("gender");
    if (augmentRace) toAugment.push("west_v_asia");
    if (toAugment.length === 0) {
      setErrMessage("Select at least one way to augment the data");
      return;
    }

    setWaiting(true);
    multipleAugment(dataset, toAugment).then((augds) => {
      if (augds === undefined) {
        return;
      }
      setAugDataset(refreshAllIds(augds));
      setWaiting(false);
    });
  };

  const download = () => {
    if (augdataset === null) return;
    const samplesStrings = augdataset.samples.map((sample) => {
      const { input, outputs, variations } = sample;
      return JSON.stringify({ input, outputs, variations });
    });
    const jsonlString = samplesStrings?.join("\n");
    const blob = new Blob([jsonlString]);

    const fileDownloadUrl = URL.createObjectURL(blob);
    const aElement = document.createElement('a');
    aElement.setAttribute('href', fileDownloadUrl);
    aElement.setAttribute('download', "augmented_data.jsonl");
    aElement.href = fileDownloadUrl;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(fileDownloadUrl);
  };

  const setSample = (i: number, sample: SampleWithVariations) => {
    if (augdataset === null) return;
    const newSamples = [...augdataset.samples];
    newSamples[i] = sample;
    setAugDataset({ samples: newSamples });
  };

  const removeVariation = (i: number, j: number) => {
    if (augdataset === null) return;
    const { samples } = augdataset;
    const newVariations = [...samples[i].variations];
    newVariations.splice(j, 1);
    console.log(i, j, newVariations, samples[i].variations);
    setSample(i, {
      input: samples[i].input,
      variations: newVariations,
      outputs: samples[i].outputs,
      id: Math.random(), // Force update
    });
  };

  const setVariation = (newValue: string, i: number, j: number) => {
    if (augdataset === null) return;
    const { samples } = augdataset;
    const newVariations = [...samples[i].variations];
    newVariations[j].text = newValue;
    setSample(i, {
      input: samples[i].input,
      outputs: samples[i].outputs,
      variations: newVariations,
      id: samples[i].id,
    });
  };

  return (
    <Card className="section">
      <CardHeader
        className="section-title"
        title="Augment the data"
      ></CardHeader>
      <CardContent className="section-content">
        <p className="horizontal-flex">
          <Checkbox
            checked={augmentGender}
            onChange={(e) => {
              setAugmentGender(e.target.checked);
              setErrMessage("");
            }}
            name="Augment gender"
          />
          Augment gender{" "}
          <i style={{ marginLeft: "0.5em" }}>
            {"(He <-> She, John <-> Marry, ...)"}
          </i>
        </p>
        <p className="horizontal-flex">
          <Checkbox
            checked={augmentRace}
            onChange={(e) => {
              setAugmentRace(e.target.checked);
              setErrMessage("");
            }}
            name="Augment race"
          />
          Augment race{" "}
          <i style={{ marginLeft: "0.5em" }}>{"(John <-> Mohammed, ...)"}</i>
        </p>
        {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <WaitableButton
            text={"Augment!"}
            onClick={augment}
            disabled={!dsIsReadyToAugment(dataset).ready}
            waiting={waiting}
            expectedTime={"a few seconds"}
            buttonParams={{ color: "secondary" }}
          />
        </div>
      </CardContent>
      <CardContent className="section-result">
        {augdataset !== null && (
          <>
            <div className="horizontal-flex" style={{ gap: "0.5em" }}>
              <Button color="secondary" variant="outlined" onClick={download}>
                Download
              </Button>
              <p>
                If you download the augmented data, you can use it to fine-tune
                a less biased model, or to do model editing using the CounterGen
                Python module.
              </p>
            </div>
            <Ready state={dsIsReadyToEvaluate(augdataset)} />
          </>
        )}
        {augdataset !== null && (
          <>
            <div className="horizontal-flex" style={{ gap: "0.2em" }}>
              <div
                style={{
                  width: "calc(100% - 8em)",
                  display: "inline-block",
                  flexGrow: "0",
                }}
              >
                Variations
              </div>
              <div
                className="horizontal-flex"
                style={{ gap: "0.2em", flexGrow: "0" }}
              >
                Categories
              </div>
            </div>
            {augdataset.samples.map((s: SampleWithVariations, i) => {
              return (
                <div className="variation-holder" key={`variation-${s.id}`}>
                  {s.variations.map((v, j) => (
                    <div
                      key={`variation-${s.id}-${j}`}
                      className="horizontal-flex"
                      style={{ gap: "0.2em" }}
                    >
                      <div
                        style={{
                          width: "calc(100% - 8em)",
                          display: "inline-block",
                        }}
                      >
                        <RemovableTextField
                          label="Variation"
                          value={v.text}
                          setValue={(s) => setVariation(s, i, j)}
                          onDelete={() => removeVariation(i, j)}
                        />
                      </div>
                      <div className="horizontal-flex" style={{ gap: "0.2em" }}>
                        {v.categories.map((c, k) => (
                          <Chip
                            label={c}
                            variant="outlined"
                            key={`variation-chip-${c}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DataAugmentation;
