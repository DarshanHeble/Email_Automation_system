import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import TemplateLibrary from "./pages/TemplateLibrary";

function App() {
  const sidebarWidth = "15rem";

  return (
    <main className="container" style={{ display: "flex" }}>
      <Sidebar width={sidebarWidth} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/templateLibrary" element={<TemplateLibrary />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
