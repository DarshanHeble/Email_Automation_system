import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface GetNameDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const GetNameDialog: React.FC<GetNameDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          console.log(inputRef);

          inputRef.current.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading
    if (name.trim()) onSubmit(name.trim());
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Template Name</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={inputRef}
            value={name}
            type="text"
            name="Template Name"
            label="Template Name"
            onChange={handleNameChange}
            sx={{ marginBlockStart: 2, width: "15rem" }}
            autoFocus
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default GetNameDialog;
