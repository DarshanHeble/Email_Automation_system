import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect, useRef } from "react";

// Defined the component's props with a generic type T
interface ArraySelectorDialogProps<T> {
  open: boolean;
  title: string;
  options: T[]; // Array of options of type T
  text?: T | null;
  getOptionLabel: (option: T) => string;
  onSubmit: (selectedItem: T | null) => void;
  onClose: () => void;
}

const ArraySelectorDialog = <T,>({
  open,
  title,
  options,
  text,
  getOptionLabel,
  onClose,
  onSubmit,
}: ArraySelectorDialogProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(text || null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // Small delay to ensure dialog is rendered
      setTimeout(() => {
        autocompleteRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedItem); // Pass the selected item to the parent
    handleClose();
  };

  const handleClose = () => {
    setSelectedItem(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={autocompleteRef}
                label="Select an option"
                variant="outlined"
                margin="normal"
              />
            )}
            value={selectedItem}
            onChange={(_event, newValue) => setSelectedItem(newValue)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="success">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ArraySelectorDialog;
