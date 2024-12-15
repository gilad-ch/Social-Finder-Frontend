import React from "react";
import { useState, useEffect } from "react";
import TwittCard from "./TwittCard";
import { fetchTwitts } from "../../services/api";
import "../../css/Twitter/TwitterFeed.css";

function TwitterFeed({ currentStatus }) {
  const [twitts, setTweets] = useState([]);
  useEffect(() => {
    setTweets(fetchTwitts(currentStatus));
  }, [currentStatus]);

  const handleUpdateTwittStatus = (twittId, status) => {
    // Update the tweet status locally in the state
    const updatedTweets = twitts.map((twitt) => {
      if (twitt.twitt_id === twittId) {
        return { ...twitt, status };
      }
      return twitt;
    });

    setTweets(updatedTweets);
    //make an API call
  };

  return (
    <div className="twitter-feed">
      {twitts.map((twitt, index) => (
        <TwittCard
          key={Array.isArray(twitt) ? twitt[0].twitt_id : twitt.twitt_id}
          twitt={twitt}
        />
      ))}
    </div>
  );
}

export default TwitterFeed;
