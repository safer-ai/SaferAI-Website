import React, { useState } from "react";
import "./App.css";
import ColabLink from "./components/ColabLink";
import DataAugmentation from "./sections/DataAugmentation";
import DataSelection from "./sections/DataSelection";
import ModelEditing from "./sections/ModelEditing";
import ModelEvaluation from "./sections/ModelEvaluation";
import { AugmentedDataset, Dataset } from "./types";
import { Container } from "@mui/material";

const App = () => {
  const [dataset, setDataset] = useState<Dataset>({ samples: [] });
  const [augdataset, setAugDataset] = useState<AugmentedDataset | null>(null);

  return (
    <Container maxWidth="md">
      <h1 className="title">Try CounterGen online!</h1>
      <p>
        The code for this website and instructions to adapt it to your needs are
        freely available! For more information, visit{" "}
        <a href="https://github.com/FabienRoger/Countergen-Website">
          github.com/FabienRoger/Countergen-Website
        </a>
        .
      </p>
      <p>
        If you use sensitive data, or if you want more flexibility, use the{" "}
        <ColabLink>Google Colab version</ColabLink> of this tool!
      </p>

      <DataSelection dataset={dataset} setDataset={setDataset} />

      <DataAugmentation
        dataset={dataset}
        augdataset={augdataset}
        setAugDataset={setAugDataset}
      />

      <ModelEvaluation augdataset={augdataset} />

      <ModelEditing />

      <p><i>Data is not stored, but it might leak, please use the colab notebook or the Countergen Python module directly if you want to use sensitive data.</i></p>
    </Container>
  );
};

export default App;
