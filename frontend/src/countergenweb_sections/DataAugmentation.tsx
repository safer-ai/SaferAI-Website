import { Card, CardContent, CardHeader, Checkbox, Chip } from "@mui/material";
import { useState } from "react";
import Ready from "../../components/Ready";
import WaitableButton from "../../components/WaitableButton";
import { AugmentedDataset, Dataset, SampleWithVariations } from "../../types";
import { multipleAugment } from "../utils/communication";
import { dsIsReadyToAugment, dsIsReadyToEvaluate } from "../utils/dsUtils";

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
      if (augds !== undefined) setAugDataset(augds);
      setWaiting(false);
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
        <WaitableButton
          text={"Augment!"}
          onClick={augment}
          disabled={!dsIsReadyToAugment(dataset).ready}
          waiting={waiting}
          expectedTime={"a few seconds"}
        />
      </CardContent>
      <CardContent className="section-result">
        {augdataset !== null && (
          <Ready state={dsIsReadyToEvaluate(augdataset)} />
        )}
        {augdataset !== null &&
          augdataset.samples.map((s: SampleWithVariations, i) => {
            return (
              <div className="variation-holder" key={`variation-${i}`}>
                {s.variations.map((v, j) => (
                  <div key={`variation-${i}-${j}`}>
                    {v.text}
                    {v.categories.map((c, k) => (
                      <Chip
                        label={c}
                        variant="outlined"
                        key={`variation-chip-${i}-${j}-${k}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default DataAugmentation;
