import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { EditOutlined, CloseOutlined } from "@mui/icons-material";
import { FC, useState } from "react";
import TemplateEditor from "../TemplateEditor";
import { Template } from "../../Types";
import GetNameDialog from "./GetNameDialog";
import { updateTemplateName } from "../../utils/database/templates";

interface EditorDailogProps {
  open: boolean;
  template: Template | null;
  onClose: () => void;
}

const EditorDailog: FC<EditorDailogProps> = ({ open, template, onClose }) => {
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [focus, setFocus] = useState(true);

  function handleNameDialogClose() {
    setNameDialogOpen(false);
    setFocus(true);
  }

  function handleNameDialogSubmit(newName: string) {
    if (template) {
      template.name = newName;
      updateTemplateName(template.id, newName);
    }
    setNameDialogOpen(false);
  }

  function handleEdit() {
    setFocus(false);
    setNameDialogOpen(true);
  }

  if (!template) return null;

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={1}>
              <Typography variant="h6">{template.name}</Typography>
              <IconButton onClick={handleEdit}>
                <EditOutlined />
              </IconButton>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <TemplateEditor
            template={template}
            focus={focus}
            setFocus={setFocus}
          />
        </DialogContent>
        <GetNameDialog
          open={nameDialogOpen}
          text={template.name}
          label={"Template Name"}
          onClose={handleNameDialogClose}
          onSubmit={handleNameDialogSubmit}
        />
      </Dialog>
    </>
  );
};

export default EditorDailog;
