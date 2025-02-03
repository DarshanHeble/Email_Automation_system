import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";
import EmailTask from "./pages/EmailTask";

function App() {
  const sidebarWidth = "15rem";

  return (
    <main className="container" style={{ display: "flex" }}>
      <BrowserRouter>
        <Sidebar width={sidebarWidth} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/template-library" element={<TemplateLibrary />} />
          <Route path="/email-task/:taskId" element={<EmailTask />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
