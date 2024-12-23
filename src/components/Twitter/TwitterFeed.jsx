import React from "react";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import TwittCard from "./TwittCard";
import { fetchTwitts } from "../../services/api";
import "../../css/Twitter/TwitterFeed.css";

function TwitterFeed({ currentStatus }) {
  const [twitts, setTweets] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setTweets(fetchTwitts(currentStatus)); // Replace this with API call
  }, [currentStatus]);

  // refetch twitts after status update
  const handleUpdateTwittStatus = () => {
    const updatedTwitts = fetchTwitts(currentStatus); // Replace this with API call
    setTweets(updatedTwitts);
  };

  const fetchMoreTwitts = () => {
    setTimeout(() => {
      const newTwitts = fetchTwitts(currentStatus);
      setTweets((prevTwitts) => [...prevTwitts, ...newTwitts]);
      if (newTwitts.length < 20) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <InfiniteScroll
      scrollableTarget="main-content"
      dataLength={twitts.length}
      next={fetchMoreTwitts}
      hasMore={hasMore}
      loader={
        <div className="spinner-container">
          <ClipLoader
            color="#3b82f6"
            loading={true} // Keep it true for infinite scrolling
            size={30}
          />
        </div>
      }
    >
      <div className="twitter-feed">
        {twitts.map((twitt, index) => (
          <TwittCard
            key={Array.isArray(twitt) ? twitt[0].twitt_id : twitt.twitt_id}
            twitt={twitt}
            updateTwittStatus={handleUpdateTwittStatus}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default TwitterFeed;
