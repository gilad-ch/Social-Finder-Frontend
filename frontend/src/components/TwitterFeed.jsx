import React from "react";
import TweetCard from "./TwittCard";
import "../css/TwitterFeed.css";

function TwitterFeed({ tweets }) {
  return (
    <div className="twitter-feed">
      {tweets.map((twitt, index) => (
        <TweetCard
          key={Array.isArray(twitt) ? twitt[0].tweet_id : twitt.tweet_id}
          twitt={twitt}
        />
      ))}
    </div>
  );
}

export default TwitterFeed;
