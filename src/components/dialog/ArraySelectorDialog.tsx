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
import { useState } from "react";

// Define the component's props with a generic type T
interface ArraySelectorDialogProps<T> {
  open: boolean; // Whether the dialog is open
  handleClose: () => void; // Function to close the dialog
  label: string; // Dialog title
  options: T[]; // Array of options of type T
  getOptionLabel: (option: T) => string; // Function to extract the display label from an option
  onSubmit: (selectedItem: T | null) => void; // Function to handle submission
}

const ArraySelectorDialog = <T,>({
  open,
  handleClose,
  label,
  options,
  getOptionLabel,
  onSubmit,
}: ArraySelectorDialogProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedItem); // Pass the selected item to the parent
    handleClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select an option"
                variant="outlined"
                margin="normal"
              />
            )}
            value={selectedItem}
            onChange={(event, newValue) => setSelectedItem(newValue)}
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
