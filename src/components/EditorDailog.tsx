import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import TemplateEditor from "./TemplateEditor";

interface EditorDailogProps {
  open: boolean;
  currentTemplate: { id: string } | null;
  onClose: () => void;
}

const EditorDailog: FC<EditorDailogProps> = ({
  open,
  currentTemplate,
  onClose,
}) => {
  if (!currentTemplate) return null;

  return (
    <Dialog open={open}>
      <DialogTitle>{currentTemplate.id} </DialogTitle>
      <DialogContent>
        <TemplateEditor />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditorDailog;
