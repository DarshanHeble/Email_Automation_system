import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";
import { useEffect, useState } from "react";
import { initDatabase } from "./utils/database";
import { LinearProgress } from "@mui/material";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isDbReady, setIsDbReady] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the database on app startup
    initDatabase()
      .then(() => {
        console.info("Database initialized Successfully");
        setTimeout(() => {
          setIsDbReady(true);
        }, 400);
      })
      .catch((err) => {
        console.error("Failed to initialize the database", err);
      });
  }, []);

  return (
    <>
      {!isDbReady && <LinearProgress sx={{ height: 6 }} />}
      <main className="container" style={{ display: "flex" }}>
        <BrowserRouter>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/template-library" element={<TemplateLibrary />} />
            {/* <Route path="/email-task/:taskId" element={<EmailTask />} /> */}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
