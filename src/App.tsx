import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Header from "./components/Header";

function App() {
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  async function sendEmail() {
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

  return (
    <main className="container">
      <Header />
    </main>
  );
}

export default App;
