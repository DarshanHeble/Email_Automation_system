import { Card, CardActionArea, CardContent, Grid2 } from "@mui/material";
import TemplateCard from "../components/TemplateCard";
import { Add } from "@mui/icons-material";
import GetNameDialog from "../components/GetNameDialog";
import { useEffect, useState } from "react";
import EditorDailog from "../components/EditorDailog";
import { addTemplate, getTemplates } from "../utils/database";
import { Template } from "../Types/types";

function TemplateLibrary() {
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openEditorDialog, setOpenEditorDialog] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplate, setNewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    getTemplates().then((templates) => {
      setTemplates(templates);
    });
  }, []);

  function handleNameDialogOpen() {
    setOpenNameDialog(true);
  }

  function handleNameDialogSubmit(templateName: string) {
    const newId = `template-${Date.now()}`;
    addTemplate(
      newId,
      templateName,
      "Start creating your email template here..."
    );
    setNewTemplate({
      id: newId,
      name: templateName,
      content: "Start creating your email template here...",
    });

    // Close name dialog and open editor dialog
    // setOpenNameDialog(false);
    setOpenEditorDialog(true);
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Grid2 container spacing={2}>
        {templates.map((template, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TemplateCard template={template} />
          </Grid2>
        ))}

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea
              sx={{ height: "100%" }}
              onClick={handleNameDialogOpen}
            >
              <CardContent sx={{ display: "grid", placeItems: "center" }}>
                <Add sx={{ fontSize: "6rem" }} />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>

      <GetNameDialog
        open={openNameDialog}
        onClose={() => setOpenNameDialog(false)}
        onSubmit={handleNameDialogSubmit}
      />
      <EditorDailog
        open={openEditorDialog}
        template={newTemplate!}
        onClose={() => setOpenEditorDialog(false)}
      />
    </div>
  );
}

export default TemplateLibrary;
