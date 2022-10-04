import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import { getDefaultDataset } from "../utils/communication";
import Collapsable from "../components/Collapsable";
import TextSelector from "../components/TextSelector";
import { Dataset } from "../types";
import { cleanDs, dsIsReadyToAugment, formatDs } from "../utils/dsUtils";
import { Card, CardHeader, CardContent } from "@mui/material";
import Ready from "../components/Ready";

type DataSelectionProps = {
  dataset: Dataset; // Not used to display
  setDataset: (ds: Dataset) => void;
};

const DataSelection = (props: DataSelectionProps) => {
  // For machine use
  const { dataset: formatedDataset, setDataset: setFormatedDataset } = props;
  // For human use
  const [cleanDataset, setCleanDataset_] = useState<Dataset>({ samples: [] });

  const setCleanDataset = (ds: Dataset) => {
    setCleanDataset_(ds);
    setFormatedDataset(formatDs(ds));
  };

  const clear = () => {
    setCleanDataset({ samples: [] });
  };

  const addDefault = (name: string) => {
    getDefaultDataset(name).then((data: Dataset | undefined) => {
      if (data !== undefined)
        setCleanDataset({
          samples: [...cleanDataset.samples, ...cleanDs(data).samples],
        });
    });
  };

  useEffect(() => addDefault("doublebind"), []); // eslint-disable-line react-hooks/exhaustive-deps

  const numberOfInputs = formatedDataset.samples.length;
  const numberOfOutputs = formatedDataset.samples.reduce(
    (prev, sample) => prev + sample.outputs.length,
    0
  );

  return (
    <Card className="section">
      <CardHeader className="section-title" title="Choose your data" />
      <CardContent className="section-content">
        <p>Enter you own data</p>
        <TextSelector dataset={cleanDataset} setDataset={setCleanDataset} />
        <div className="horizontal-flex">
          <Button onClick={clear} variant="outlined">
            Clear
          </Button>
          <Button onClick={() => addDefault("doublebind")} variant="outlined">
            Add double bind data
          </Button>
          <Button
            onClick={() => addDefault("male-stereotypes")}
            variant="outlined"
          >
            Add male stereotype data
          </Button>
          <Button
            onClick={() => addDefault("female-stereotypes")}
            variant="outlined"
          >
            Add female stereotype data
          </Button>
        </div>
        <p>
          Note: all empty fields will be ignored. Spaces at the end of the input
          are removed, and space are added at the beginning of outputs.
        </p>
        <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
        </Collapsable>
      </CardContent>
      <CardContent className="section-result">
        <Ready state={dsIsReadyToAugment(formatedDataset)} />
        <p>
          {numberOfInputs} valid inputs and {numberOfOutputs} valid outputs.
        </p>
      </CardContent>
    </Card>
  );
};

export default DataSelection;
