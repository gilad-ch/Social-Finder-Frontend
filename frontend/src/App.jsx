import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./css/App.css";

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState("Twitter");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Header
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
      <div className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <MainContent selectedPlatform={selectedPlatform} />
      </div>
    </div>
  );
}

export default App;
