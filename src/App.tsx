import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";
import { LinearProgress } from "@mui/material";
import EmailTask from "./pages/EmailTask";
import { useQuery } from "@tanstack/react-query";
import { initTemplatesTable } from "./utils/database/templates";
import { useState } from "react";
import UserPage from "./pages/UserPage";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  async function initializeDatabase() {
    await initTemplatesTable();
    return true;
  }

  const { isLoading } = useQuery({
    queryKey: ["initializeDatabase"],
    queryFn: initializeDatabase,
  });

  return (
    <>
      {isLoading && <LinearProgress sx={{ height: 6 }} />}
      <main className="container" style={{ display: "flex" }}>
        <BrowserRouter>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/template-library" Component={TemplateLibrary} />
            <Route path="/userPage" Component={UserPage} />
            <Route path="/email-task/:taskId" Component={EmailTask} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
