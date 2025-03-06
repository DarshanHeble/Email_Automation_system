import { invoke } from "@tauri-apps/api/core";
import { Email } from "../Types";

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await invoke<Email>("send_email", {
      to: to,
      subject: subject,
      body: body,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}
