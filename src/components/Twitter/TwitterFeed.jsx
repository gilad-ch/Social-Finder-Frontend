import React from "react";
import { useState, useEffect } from "react";
import TwittCard from "./TwittCard";
import { fetchTwitts } from "../../services/api";
import "../../css/Twitter/TwitterFeed.css";

function TwitterFeed({ currentStatus }) {
  const [twitts, setTweets] = useState([]);
  useEffect(() => {
    setTweets(fetchTwitts(currentStatus)); // Replace this with API call
  }, [currentStatus]);

  // refetch twitts after status update
  const handleUpdateTwittStatus = () => {
    const updatedTwitts = fetchTwitts(currentStatus); // Replace this with API call
    setTweets(updatedTwitts);
  };

  return (
    <div className="twitter-feed">
      {twitts.map((twitt, index) => (
        <TwittCard
          key={Array.isArray(twitt) ? twitt[0].twitt_id : twitt.twitt_id}
          twitt={twitt}
          updateTwittStatus={handleUpdateTwittStatus}
        />
      ))}
    </div>
  );
}

export default TwitterFeed;
