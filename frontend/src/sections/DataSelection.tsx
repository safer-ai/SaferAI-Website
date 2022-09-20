import { Button } from "@mui/material";
import "../App.css";
import ColabLink from "../components/ColabLink";
import Collapsable from "../components/Collapsable";
import TextSelector from "../components/TextSelector";
import { Dataset } from "../types";

type DataSelectionProps = {
  dataset: Dataset;
  setDataset: (ds: Dataset) => void;
};

const DataSelection = (props: DataSelectionProps) => {
  const { dataset, setDataset } = props;

  const clear = () => {
    setDataset({ samples: [] });
  };

  return (
    <div className="section">
      <div className="section-title">Choose your data</div>
      <div className="section-content">
        <p>Enter you own data</p>
        <TextSelector dataset={dataset} setDataset={setDataset} />
        <div className="options-holder">
          <Button onClick={clear}>Clear</Button>
          <Button>Add double bind data</Button>
        </div>
        <p>Note: all empty fields will be ignored.</p>
        <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable>
      </div>
      <div className="section-result">50 things loaded</div>
    </div>
  );
};

export default DataSelection;
