import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";

import {
  addImage,
  toggleBold,
  toggleHeading,
  toggleItalic,
} from "../utils/editor";
import { Template } from "../Types/types";
import { FC } from "react";
import { SaveOutlined } from "@mui/icons-material";
import { updateTemplateContent } from "../utils/database";

interface TemplateEditorProps {
  template: Template;
}

const TemplateEditor: FC<TemplateEditorProps> = ({ template }) => {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image, Dropcursor],
    content: template.content || "Start creating your email template here...",
  });

  function handleSave() {
    if (editor) {
      const updatedContent = editor.getHTML();

      template.content = updatedContent;
      updateTemplateContent(template.id, updatedContent)
        .then(() => {
          alert("Saved Successfully");
        })
        .catch((err) => {
          alert(`Error in updating the template: ${err}`);
        });
    }
  }

  return (
    <Box>
      {editor ? (
        <Container>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"}>
              <Button onClick={() => toggleBold(editor)}>Bold</Button>
              <Button onClick={() => toggleItalic(editor)}>Italic</Button>
              <Button onClick={() => toggleHeading(editor, 2)}>
                Heading 2
              </Button>
              <Button>Add Link</Button>
              <Button onClick={() => addImage(editor)}>Add Image</Button>
            </Stack>
            <Stack>
              <IconButton onClick={handleSave} color="success">
                <SaveOutlined />
              </IconButton>
            </Stack>
          </Stack>
          <Box sx={{ paddingBlock: 2 }}>
            <EditorContent editor={editor} color="red" />
          </Box>
        </Container>
      ) : (
        "Error in Initailising Editor"
      )}
    </Box>
  );
};

export default TemplateEditor;
