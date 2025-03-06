import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { updateEmailTaskTemplateId } from "../utils/database/emailTask";
import { getTemplates } from "../utils/database/templates";
import { Button } from "@mui/material";

function EmailTask() {
  const { taskId } = useParams<{ taskId: string }>();
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const templates = await getTemplates();
        setTemplates(templates);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    }
    fetchTemplates();
  }, []);

  const handleTemplateChange = async (
    _event: any,
    value: { id: string; name: string } | null
  ) => {
    setSelectedTemplate(value);
    if (value && taskId) {
      try {
        await updateEmailTaskTemplateId(taskId, value.id);
        console.info("Template ID updated successfully.");
      } catch (error) {
        console.error("Failed to update template ID:", error);
      }
    }
  };

  return (
    <div>
      <div>Task ID: {taskId}</div>
      <Autocomplete
        options={templates}
        getOptionLabel={(option) => option.name}
        value={selectedTemplate}
        onChange={handleTemplateChange}
        renderInput={(params) => (
          <TextField {...params} label="Select Template" variant="outlined" />
        )}
      />
    </div>
  );
}

export default EmailTask;
