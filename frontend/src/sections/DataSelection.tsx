import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import { getDefaultDataset } from "../utils/communication";
import ColabLink from "../components/ColabLink";
import Collapsable from "../components/Collapsable";
import TextSelector from "../components/TextSelector";
import { Dataset } from "../types";
import { cleanDs, formatDs } from "../utils/dsUtils";

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

  return (
    <div className="section">
      <div className="section-title">Choose your data</div>
      <div className="section-content">
        <p>Enter you own data</p>
        <TextSelector dataset={cleanDataset} setDataset={setCleanDataset} />
        <div className="options-holder">
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
      </div>
      <div className="section-result">
        {numberOfInputs} valid inputs and {numberOfOutputs} valid outputs.
      </div>
    </div>
  );
};

export default DataSelection;
