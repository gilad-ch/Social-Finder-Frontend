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

  // refetch tweets if current status is changed
  useEffect(() => {
    setTweets(fetchTwitts(currentStatus)); // Replace this with API call - filters can be added here
  }, [currentStatus]);

  // Function to handle the deletion of a tweet - only in the UI
  const handleDeleteTwitt = (twittId) => {
    setTweets((prevTwitts) =>
      prevTwitts.filter((twitt) => twitt.twitt_id !== twittId)
    );
  };

  const fetchMoreTwitts = () => {
    setTimeout(() => {
      const newTwitts = fetchTwitts(currentStatus); // Replace this with API call - filters can be added here
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
          <ClipLoader color="#3b82f6" loading={true} size={30} />
        </div>
      }
    >
      <div className="twitter-feed">
        {twitts.map((twitt, index) => (
          <TwittCard
            key={twitt.twitt_id}
            twitt={twitt}
            deleteTwitt={handleDeleteTwitt}
            currentStatus={currentStatus}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default TwitterFeed;
