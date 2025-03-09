import "./App.css";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";
import EmailTask from "./pages/EmailTask";
import UserPage from "./pages/UserPage";

import { initTemplatesTable } from "./utils/database/templates";
import { initUsersTable } from "./utils/database/user";
import { initEmailTasksTable } from "./utils/database/emailTask";
import { initTaskUserLinkageDatabase } from "./utils/database/taskUserLinkage";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  async function initializeDatabase() {
    await Promise.all([
      initTemplatesTable(),
      initUsersTable(),
      initEmailTasksTable(),
      initTaskUserLinkageDatabase(),
    ]);
    return true;
  }

  // deleteEmailTasksTable();
  // deleteTaskUserLinkageTable();
  // deleteUsersTable();
  // DeleteTemplatesTable();

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
