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
  text?: string;
  label: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const GetNameDialog: React.FC<GetNameDialogProps> = ({
  open,
  text,
  label,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
      if (text) {
        setName(text);
      }
      return () => clearTimeout(timer);
    }
  }, [open, text]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading

    if (name.trim()) {
      onSubmit(name.trim());
    }

    handleClose();
  };

  function handleClose() {
    setName("");
    onClose();
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={inputRef}
            value={name}
            type="text"
            name={label}
            label={label}
            onChange={handleNameChange}
            sx={{ marginBlockStart: 2, width: "15rem" }}
            autoFocus
            required
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

export default GetNameDialog;
