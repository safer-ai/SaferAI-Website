import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import { getDefaultDataset } from "../utils/communication";
import ColabLink from "../components/ColabLink";
import Collapsable from "../components/Collapsable";
import TextSelector from "../components/TextSelector";
import { Dataset } from "../types";
import { cleanDs, formatDs } from "../utils/dsUtils";
import { Card, CardHeader, CardContent } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

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
      if (data !== undefined) setCleanDataset(cleanDs(data));
    });
  };

  useEffect(() => addDefault("doublebind"), []); // eslint-disable-line react-hooks/exhaustive-deps

  const numberOfInputs = formatedDataset.samples.length;
  const numberOfOutputs = formatedDataset.samples.reduce(
    (prev, sample) => prev + sample.outputs.length + 1,
    0
  );
  const statusIsGood = numberOfInputs > 2 && numberOfOutputs > 6;
  const statusDiv = statusIsGood ? (
    <p>
      <DoneIcon />
    </p>
  ) : (
    <p className="horizontal-flex">
      <CloseIcon /> Not enough inputs.
    </p>
  );

  return (
    <Card className="section">
      <CardHeader className="section-title" title="Choose your data" />
      <CardContent className="section-content">
        <p>Enter you own data</p>
        <TextSelector dataset={cleanDataset} setDataset={setCleanDataset} />
        <div className="horizontal-flex">
          <Button onClick={clear}>Clear</Button>
          <Button onClick={() => addDefault("doublebind")}>
            Add double bind data
          </Button>
        </div>
        <p>
          Note: all empty fields will be ignored. Spaces at the end of the input
          are removed, and space are added at the beginning of outputs.
        </p>
        <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable>
      </CardContent>
      <CardContent className="section-result">
        {statusDiv}
        <p>
          {numberOfInputs} valid inputs and {numberOfOutputs} valid outputs.
        </p>
      </CardContent>
    </Card>
  );
};

export default DataSelection;
