import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import Ready from "../components/Ready";
import TextSelector from "../components/TextSelector";
import { Dataset, Sample } from "../types";
import { getDefaultDataset } from "../utils/communication";
import { cleanDs, dsIsReadyToAugment, formatDs } from "../utils/dsUtils";
import { MAX_SAMPLES } from "../utils/parameters";

type DataSelectionProps = {
  dataset: Dataset; // Not used to display
  setDataset: (ds: Dataset) => void;
};

const DEFAULT_DS = "male-stereotypes";

const DataSelection = (props: DataSelectionProps) => {
  // For machine use
  const { dataset: formatedDataset, setDataset: setFormatedDataset } = props;
  // For human use
  const [cleanDataset, setCleanDataset_] = useState<Dataset>({ samples: [] });

  const [selectedData, setSelectData] = useState<string>(DEFAULT_DS);

  const [displayUploadFileInfo, setDisplayUploadFileInfo] =
    useState<boolean>(false);

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

  useEffect(() => addDefault(DEFAULT_DS), []); // eslint-disable-line react-hooks/exhaustive-deps

  const numberOfInputs = formatedDataset.samples.length;
  const numberOfOutputs = formatedDataset.samples.reduce(
    (prev, sample) => prev + sample.outputs.length,
    0
  );

  const loadFile = (evt: any) => {
    // From https://javascript.plainenglish.io/how-to-create-download-and-upload-files-in-react-apps-80893da4247a

    const fileObj = evt.target.files[0]; // We've not allowed multiple files.
    const reader = new FileReader();
    setDisplayUploadFileInfo(false);

    let fileloaded = (e: any) => {
      const fileContents: string = e.target.result;
      console.log(fileContents);
      const lines = fileContents.split("\n");
      let samples: Sample[];
      try {
        samples = lines.slice(0, MAX_SAMPLES + 2).map((line: string) => {
          const r = JSON.parse(line);
          // eslint-disable-next-line no-throw-literal
          if (!("input" in r) || !("outputs" in r)) throw "invalid json";
          return r as Sample;
        });

        setCleanDataset({
          samples: [...cleanDataset.samples, ...cleanDs({ samples }).samples],
        });
        // read the file
      } catch (e) {
        setDisplayUploadFileInfo(true);
      }
    };

    reader.onload = fileloaded;
    reader.readAsText(fileObj);
  };

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
          <Button
            variant="outlined"
            component="label"
            style={{ textTransform: "none" }}
          >
            Upload file
            <input
              type="file"
              className="hidden"
              multiple={false}
              accept=".jsonl,application/jsonl"
              onChange={(evt) => loadFile(evt)}
              hidden
            />
          </Button>
          <Button onClick={clear} variant="outlined">
            Clear
          </Button>
        </div>
        {displayUploadFileInfo && (
          <>
            <p>
              <i>
                The file should be a JSONL file where each line is a JSON object
                with an "input" field (with a string value) and an "outputs"
                field (with a list of string value). For example, this line is a
                valid line:
              </i>
            </p>
            <code>{`{"input": "She is", "outputs":[" alive", " dead"]}`}</code>
          </>
        )}
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
          <i>
            Note: all empty fields will be ignored. Spaces at the end of the
            input are removed, and space are added at the beginning of outputs.
          </i>
        </p>
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
