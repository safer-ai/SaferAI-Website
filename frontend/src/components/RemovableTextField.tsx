import CloseIcon from "@mui/icons-material/Close";
import "./RemovableTextField.css";
import { IconButton, TextField } from "@mui/material";

type RemovableTextFieldProps = {
  key: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  onDelete?: (e: any) => void;
};

const RemovableTextField = (props: RemovableTextFieldProps) => {
  const { key, label, value, onChange, onDelete } = props;
  return (
    <TextField
      key={key}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      multiline
      size="small"
      fullWidth
      InputProps={
        onDelete
          ? {
              endAdornment: (
                <IconButton onClick={onDelete} size={"small"}>
                  <CloseIcon fontSize={"small"} />
                </IconButton>
              ),
            }
          : {}
      }
    />
  );
};

export default RemovableTextField;
