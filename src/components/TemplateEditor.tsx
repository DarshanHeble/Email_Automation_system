import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
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
import { Template } from "../Types";
import { FC, useEffect, useState } from "react";
import {
  EditOutlined,
  SaveOutlined,
  SubjectOutlined,
} from "@mui/icons-material";
import {
  updateTemplateContent,
  updateTemplateName,
} from "../utils/database/templates";
import { ResizableImage } from "tiptap-extension-resizable-image";
import GetNameDialog from "./GetNameDialog";
import { set } from "date-fns";

interface TemplateEditorProps {
  template: Template;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateEditor: FC<TemplateEditorProps> = ({
  template,
  focus,
  setFocus,
}) => {
  const [nameDialogOpen, setNameDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          style: "max-width: 100%; height: auto; resize: both; overflow: auto;",
        },
      }),
      ResizableImage,
    ],
    editorProps: {
      attributes: {
        style: "padding: 5px",
      },
    },
    content: template.content || "Start creating your email template here...",
  });

  useEffect(() => {
    if (editor) {
      editor.chain().focus("end").run();
    }
  }, [editor]);

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

  function handleEdit() {
    setFocus(false);
    setNameDialogOpen(true);
  }

  function handleNameDialogSubmit(newName: string) {
    if (template) {
      template.subject = newName;
      updateTemplateName(template.id, newName);
    }
    setNameDialogOpen(false);
    setFocus(true);
  }

  function handleNameDialogClose() {
    setNameDialogOpen(false);
    setFocus(true);
  }

  if (!editor) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <p>Failed to initialize the editor. Please try again.</p>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <SubjectOutlined />
        <Typography variant={"h6"}>{template.subject}</Typography>
        <IconButton onClick={handleEdit}>
          <EditOutlined />
        </IconButton>
      </Stack>
      <Divider sx={{ marginBlock: 1 }} />
      <Container>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"}>
            <Button onClick={() => toggleBold(editor)}>Bold</Button>
            <Button onClick={() => toggleItalic(editor)}>Italic</Button>
            <Button onClick={() => toggleHeading(editor, 2)}>Heading 2</Button>
            {/* <Button>Add Link</Button> */}
            <Button onClick={() => addImage(editor)}>Add Image</Button>
          </Stack>
          <Stack>
            <IconButton onClick={handleSave} color="success">
              <SaveOutlined />
            </IconButton>
          </Stack>
        </Stack>
        <Box sx={{ paddingBlock: 2 }}>
          <EditorContent
            editor={editor}
            onBlur={() => {
              if (focus) editor?.chain().focus().run();
            }}
          />
        </Box>
      </Container>
      <GetNameDialog
        open={nameDialogOpen}
        text={template.subject}
        label={"Subject Name"}
        onClose={handleNameDialogClose}
        onSubmit={handleNameDialogSubmit}
      />
    </Box>
  );
};

export default TemplateEditor;
