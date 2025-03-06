import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, CloseOutlined } from "@mui/icons-material";
import { FC, useState } from "react";
import TemplateEditor from "./TemplateEditor";
import { Template } from "../Types";
import GetNameDialog from "./GetNameDialog";
import { updateTemplateName } from "../utils/database/templates";

interface EditorDailogProps {
  open: boolean;
  template: Template | null;
  onClose: () => void;
}

const EditorDailog: FC<EditorDailogProps> = ({ open, template, onClose }) => {
  const [nameDialogOpen, setNameDialogOpen] = useState(false);

  function handleNameDialogClose() {
    setNameDialogOpen(false);
  }

  function handleNameDialogSubmit(name: string) {
    if (template) {
      template.name = name;
      updateTemplateName(template.id, name);
    }
    setNameDialogOpen(false);
  }
  if (!template) return null;

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1}>
              <h3>{template.name}</h3>
              <IconButton onClick={() => setNameDialogOpen(true)}>
                <Edit />
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
          <TemplateEditor template={template} />
        </DialogContent>
      </Dialog>
      <GetNameDialog
        open={nameDialogOpen}
        text={template.name}
        label={template.name}
        onClose={handleNameDialogClose}
        onSubmit={handleNameDialogSubmit}
      />
    </>
  );
};

export default EditorDailog;
