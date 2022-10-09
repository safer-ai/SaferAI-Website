import CloseIcon from "@mui/icons-material/Close";
import "./RemovableTextField.css";
import { IconButton, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

type RemovableTextFieldProps = {
  label: string;
  value: string;
  setValue: (e: any) => void;
  onDelete?: () => void;
};

const RemovableTextField = (props: RemovableTextFieldProps) => {
  const { label, value, setValue, onDelete } = props;
  const [tempValue, setTempValue] = useState<string | undefined>(undefined);

  // Use value as the source of truth only at initialization
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTempValue(value), []);
  const displayedValue = tempValue ?? "";

  const onChange = (e: any) => {
    const { value: nextValue } = e.target;
    setTempValue(nextValue);
    if (nextValue !== value) {
      const debounceSetValue = debounce((v) => setValue(v), 500);
      debounceSetValue(nextValue);
    }
  };

  return (
    <TextField
      label={label}
      value={displayedValue}
      onChange={onChange}
      variant="outlined"
      multiline
      size="small"
      fullWidth
      margin="dense"
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
