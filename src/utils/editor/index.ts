// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   setGreetMsg(await invoke("greet", { name }));
// }

import { Editor } from "@tiptap/react";
import { Level } from "../../Types";

export function toggleBold(editor: Editor) {
  editor.chain().focus().toggleBold().run();
}

export function toggleItalic(editor: Editor) {
  editor.chain().focus().toggleItalic().run();
}

export function toggleHeading(editor: Editor, level: Level) {
  editor.chain().focus().toggleHeading({ level: level }).run();
}

export function addImage(editor: Editor) {
  const url = prompt("Enter the URL of the image:");
  if (!url) return;
  editor
    .chain()
    .focus()
    .setImage({ src: url, alt: "Image cannot be fetched" })
    .run();
}
