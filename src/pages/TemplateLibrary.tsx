import { useEffect, useState } from "react";
import { Fab, Grid2 } from "@mui/material";
import { Add } from "@mui/icons-material";
import TemplateCard from "../components/TemplateCard";
import GetNameDialog from "../components/GetNameDialog";
import EditorDailog from "../components/EditorDailog";
import { addTemplate, deleteTemplate, getTemplates } from "../utils/database";
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
    const defaultContent = "Start creating your email template here...";

    addTemplate(newId, templateName, defaultContent);
    setNewTemplate({
      id: newId,
      name: templateName,
      content: defaultContent,
    });

    setTemplates((prev) => [
      ...prev,
      {
        id: newId,
        name: templateName,
        content: defaultContent,
      },
    ]);

    // Close name dialog and open editor dialog
    // setOpenNameDialog(false);
    setOpenEditorDialog(true);
  }

  function handleTemplateDelete(id: string) {
    setTemplates(templates.filter((template) => template.id !== id));

    deleteTemplate(id)
      .then(() => alert("Template Deleted"))
      .catch((err) => alert(`Some went wrong ${err}`));
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Grid2 container spacing={2}>
        {templates.length == 0 ? (
          <div
            style={{
              height: "-webkit-fill-available",
              display: "grid",
              placeItems: "center",
            }}
          >
            Template is Empty
          </div>
        ) : (
          templates.map((template, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TemplateCard
                template={template}
                onDelete={handleTemplateDelete}
              />
            </Grid2>
          ))
        )}

        <Fab
          variant="extended"
          onClick={handleNameDialogOpen}
          sx={{ position: "absolute", bottom: "3rem", right: "3rem" }}
        >
          <Add sx={{ mr: 2 }} />
          New Template
        </Fab>
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
