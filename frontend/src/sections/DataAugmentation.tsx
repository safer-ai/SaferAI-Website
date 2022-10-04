import { Chip } from "@mui/material";
import "../App.css";
import { AugmentedDataset, Dataset, SampleWithVariations } from "../types";
import { multipleAugment } from "../utils/communication";
import { Card, CardHeader, CardContent } from "@mui/material";
import { dsIsReadyToAugment, dsIsReadyToEvaluate } from "../utils/dsUtils";
import Ready from "../components/Ready";
import { useState } from "react";
import WaitableButton from "../components/WaitableButton";

type DataAugmentationProps = {
  dataset: Dataset;
  augdataset: AugmentedDataset | null;
  setAugDataset: (augds: AugmentedDataset) => void;
};

const DataAugmentation = (props: DataAugmentationProps) => {
  const { dataset, augdataset, setAugDataset } = props;

  const [waiting, setWaiting] = useState<boolean>(false);

  const augment = () => {
    setWaiting(true);
    multipleAugment(dataset, ["gender"]).then((augds) => {
      if (augds !== undefined) setAugDataset(augds);
      setWaiting(false);
    }); // Could also we west_v_asia
  };

  return (
    <Card className="section">
      <CardHeader
        className="section-title"
        title="Augment the data"
      ></CardHeader>
      <CardContent className="section-content">
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
                    {v.categories.map((c) => (
                      <Chip
                        label={c}
                        variant="outlined"
                        key={`variation-chip-${i}-${j}`}
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
