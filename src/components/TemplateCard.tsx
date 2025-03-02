import {
  Card,
  CardActionArea,
  CardContent,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, useState, MouseEvent } from "react";
import { Template } from "../Types";
import EditorDailog from "./EditorDailog";

interface TemplateCardProps {
  template: Template;
  onDelete: (id: string) => void;
}

const TemplateCard: FC<TemplateCardProps> = ({ template, onDelete }) => {
  const [openEditorDialog, setOpenEditorDialog] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleCardClick = () => {
    setOpenEditorDialog(true);
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDelete = () => {
    onDelete(template.id);
    handleClose();
  };

  return (
    <>
      <Card onContextMenu={handleContextMenu}>
        <CardActionArea onClick={handleCardClick}>
          <CardContent>
            <div
              className="Preview"
              style={{
                height: "5rem",
                borderBottom: "1px solid",
                marginBlockEnd: 10,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dangerouslySetInnerHTML={{ __html: template.content }}
            />
            <h1>{template.name}</h1>
          </CardContent>
        </CardActionArea>
      </Card>
      <EditorDailog
        open={openEditorDialog}
        template={template!}
        onClose={() => setOpenEditorDialog(false)}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default TemplateCard;
