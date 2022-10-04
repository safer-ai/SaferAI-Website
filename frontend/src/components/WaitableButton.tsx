import { Button, CircularProgress } from "@mui/material";
import "./WaitableButton.css";

type WaitableButtonProps = {
  text: string;
  onClick: () => void;
  expectedTime?: string;
  disabled?: boolean;
  waiting?: boolean;
};

const WaitableButton = (props: WaitableButtonProps) => {
  const { text, onClick, expectedTime, disabled, waiting } = props;
  return (
    <div className="horizontal-flex">
      <Button
        onClick={onClick}
        disabled={waiting || disabled}
        variant="outlined"
      >
        {text}
      </Button>
      {waiting && (
        <>
          <CircularProgress style={{ marginLeft: "1em", marginRight: "1em" }} />
          {expectedTime && <p>This should take about {expectedTime}...</p>}
        </>
      )}
    </div>
  );
};

export default WaitableButton;
