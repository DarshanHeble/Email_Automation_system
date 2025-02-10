import { Card, CardActionArea, CardContent } from "@mui/material";
import { FC, useState } from "react";
import { Template } from "../Types/types";
import EditorDailog from "./EditorDailog";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: FC<TemplateCardProps> = ({ template }) => {
  const [openEditorDialog, setOpenEditorDialog] = useState(false);

  const handleCardClick = () => {
    setOpenEditorDialog(true);
  };

  return (
    <>
      <Card>
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
    </>
  );
};

export default TemplateCard;
