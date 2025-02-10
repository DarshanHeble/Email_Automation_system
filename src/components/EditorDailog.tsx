import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, SaveOutlined, CloseOutlined } from "@mui/icons-material";
import { FC } from "react";
import TemplateEditor from "./TemplateEditor";
import { Template } from "../Types/types";

interface EditorDailogProps {
  open: boolean;
  template: Template | null;
  onClose: () => void;
}

const EditorDailog: FC<EditorDailogProps> = ({ open, template, onClose }) => {
  if (!template) return null;

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1}>
            <h3>{template.name}</h3>
            <IconButton>
              <Edit />
            </IconButton>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <IconButton onClick={onClose} color="success">
              <SaveOutlined />
            </IconButton>
            <IconButton color="primary" onClick={onClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <TemplateEditor template={template} />
      </DialogContent>
    </Dialog>
  );
};

export default EditorDailog;
