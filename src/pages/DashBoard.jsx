import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function DashBoard({ selectedPlatform }) {
  const [currentStatus, setStatus] = useState("New");
  return (
    <div className="content-wrapper">
      <Sidebar currentStatus={currentStatus} setStatus={setStatus} />
      <MainContent
        selectedPlatform={selectedPlatform}
        currentStatus={currentStatus}
      />
    </div>
  );
}

export default DashBoard;
