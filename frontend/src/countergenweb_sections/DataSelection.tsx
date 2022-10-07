import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import Collapsable from "../components/Collapsable";
import Ready from "../components/Ready";
import TextSelector from "../components/TextSelector";
import { Dataset } from "../types";
import { getDefaultDataset } from "../utils/communication";
import { cleanDs, dsIsReadyToAugment, formatDs } from "../utils/dsUtils";

type DataSelectionProps = {
  dataset: Dataset; // Not used to display
  setDataset: (ds: Dataset) => void;
};

const DataSelection = (props: DataSelectionProps) => {
  // For machine use
  const { dataset: formatedDataset, setDataset: setFormatedDataset } = props;
  // For human use
  const [cleanDataset, setCleanDataset_] = useState<Dataset>({ samples: [] });

  const [selectedData, setSelectData] = useState<string>("doublebind-negative");

  const setCleanDataset = (ds: Dataset) => {
    setCleanDataset_(ds);
    setFormatedDataset(formatDs(ds));
  };

  const clear = () => {
    setCleanDataset({ samples: [] });
  };

  const uploadData = () => {};

  const addDefault = (name: string) => {
    getDefaultDataset(name).then((data: Dataset | undefined) => {
      if (data !== undefined)
        setCleanDataset({
          samples: [...cleanDataset.samples, ...cleanDs(data).samples],
        });
    });
  };

  useEffect(() => addDefault("doublebind-negative"), []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div
          className="horizontal-flex"
          style={{ padding: "0.5em", gap: "0.5em" }}
        >
          <Button onClick={uploadData} variant="outlined">
            Upload your data
          </Button>
          <Button onClick={clear} variant="outlined">
            Clear
          </Button>
        </div>
        <div
          className="horizontal-flex"
          style={{ gap: "0.5em", padding: "0.5em" }}
        >
          <p style={{ margin: 0 }}>Add default data</p>
          <Select
            value={selectedData}
            label="Data"
            size="small"
            onChange={(e) => setSelectData(e.target.value)}
            style={{ width: "18em" }}
          >
            <MenuItem value={"doublebind-negative"}>
              Double bind, negative adjectives
            </MenuItem>
            <MenuItem value={"doublebind-positive"}>
              Double bind, positive adjectives
            </MenuItem>
            <MenuItem value={"female-stereotypes"}>Female stereotypes</MenuItem>
            <MenuItem value={"male-stereotypes"}>Male stereotypes</MenuItem>
          </Select>
          <Button onClick={() => addDefault(selectedData)} variant="outlined">
            Load and append
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
