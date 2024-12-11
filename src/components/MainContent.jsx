import React from "react";
import TwitterFeed from "./Twitter/TwitterFeed";
import PlatformInProgress from "./PlatformInProgress";
import { get_twitts } from "../services/api";
import "../css/MainContent.css";

function MainContent({ selectedPlatform, currentStatus }) {
  const renderContent = () => {
    if (selectedPlatform === "Twitter") {
      const tweets = get_twitts(currentStatus);
      return <TwitterFeed tweets={tweets} />;
    } else {
      return <PlatformInProgress platform={selectedPlatform} />;
    }
  };

  return <main className="main-content">{renderContent()}</main>;
}

export default MainContent;
