import { Card, CardActionArea, CardContent, Grid2 } from "@mui/material";
import TemplateCard from "../components/TemplateCard";
import { Add } from "@mui/icons-material";
import GetNameDialog from "../components/GetNameDialog";
import { useEffect, useState } from "react";
import EditorDailog from "../components/EditorDailog";
import { addTemplate, getTemplates } from "../utils/database";

function TemplateLibrary() {
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openEditorDialog, setOpenEditorDialog] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<{
    id: string;
  } | null>(null);

  useEffect(() => {
    getTemplates().then((templates) => {
      console.log(templates);
      setTemplates(templates.map((id) => ({ id })));
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
    setCurrentTemplate({ id: newId });

    // Close name dialog and open editor dialog
    // setOpenNameDialog(false);
    setOpenEditorDialog(true);
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TemplateCard />
        </Grid2>
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
        currentTemplate={currentTemplate!}
        onClose={() => setOpenEditorDialog(false)}
      />
    </div>
  );
}

export default TemplateLibrary;
