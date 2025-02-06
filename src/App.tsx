import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";
import EmailTask from "./pages/EmailTask";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <main className="container" style={{ display: "flex" }}>
      <BrowserRouter>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
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
