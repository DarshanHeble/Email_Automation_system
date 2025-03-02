import React, { useState } from "react";
import { User } from "../../Types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface UserDialogProps {
  open: boolean;
  user?: User;
  onSave: (user: User) => void;
  onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  user,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<User>({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    dob: user?.dob || "", // Added dob property
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({
      ...formData,
      dob: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{user ? "Update User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={formData.dob ? dayjs(formData.dob) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  margin: "dense",
                  fullWidth: true,
                  required: true,
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button type="submit">{user ? "Update" : "Create"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
