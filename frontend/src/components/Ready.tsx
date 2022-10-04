import React from "react";
import "./Ready.css";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export type ReadyState = { ready: boolean; message: string };

type ReadyProps = {
  state: ReadyState;
};

const Ready = (props: ReadyProps) => {
  const { state } = props;
  const { ready, message } = state;
  return ready ? (
    <p>
      <DoneIcon /> {message}
    </p>
  ) : (
    <p className="horizontal-flex">
      <CloseIcon /> {message}
    </p>
  );
};

export default Ready;
