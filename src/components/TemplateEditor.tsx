import { Box, Button, Container } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  addImage,
  toggleBold,
  toggleHeading,
  toggleItalic,
} from "../utils/editor";
import { Template } from "../Types/types";
import { FC } from "react";

interface TemplateEditorProps {
  template: Template;
}

const TemplateEditor: FC<TemplateEditorProps> = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: "Start creating your email template here...",
  });

  return (
    <Box>
      {editor ? (
        <Container>
          <Box>
            <Button onClick={() => toggleBold(editor)}>Bold</Button>
            <Button onClick={() => toggleItalic(editor)}>Italic</Button>
            <Button onClick={() => toggleHeading(editor, 2)}>Heading 2</Button>
            <Button>Add Link</Button>
            <Button onClick={() => addImage(editor)}>Add Image</Button>
          </Box>
          <Box sx={{ paddingBlock: 2 }}>
            <EditorContent editor={editor} />
          </Box>
        </Container>
      ) : (
        "Error in Initailising Editor"
      )}
    </Box>
  );
};

export default TemplateEditor;
