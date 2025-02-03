import { invoke } from "@tauri-apps/api/core";

export async function sendEmail() {
  try {
    await invoke("send_email", {
      to: "darshanheble1@gmail.com",
      subject: "Your Subject",
      body: "Your email body content",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
