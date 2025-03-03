import React, { useEffect, useState } from "react";
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
import { v4 } from "uuid";

interface UserDialogProps {
  open: boolean;
  user?: User;
  onSave: (user: User, action: "create" | "update") => void;
  onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  user,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<User>({
    id: user?.id || v4(),
    name: user?.name || "",
    email: user?.email || "",
    dob: user?.dob || "",
  });
  const [action, setAction] = useState<"create" | "update">("create");

  useEffect(() => {
    if (open && !user) {
      setFormData({
        id: v4(),
        name: "",
        email: "",
        dob: "",
      });
      setAction("create");
    } else if (user) {
      setFormData(user);
      setAction("update");
    }
  }, [open, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.table(formData);

    e.preventDefault();
    onSave(formData, action);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({
      ...formData,
      dob: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  const dialogClose = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      dob: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={dialogClose} maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{user ? "Update User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="id"
            name="id"
            label="Id"
            type="text"
            fullWidth
            value={formData.id}
            onChange={handleChange}
            required
          />
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
          <Button onClick={dialogClose} color="error">
            Cancel
          </Button>
          <Button type="submit">{user ? "Update" : "Create"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
