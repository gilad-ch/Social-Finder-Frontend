import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../css/TwittCard.css";

function TweetContent({ twitt, showActions, isChained = false }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  return (
    <div className={`twitt-card ${isChained ? "chained" : ""}`}>
      <div className="twitt-card-content">
        <div className="profile-header">
          <img
            className="profile-image"
            src={twitt.profile_image}
            alt="Profile picture"
          />
          <div className="profile-info">
            <p className="username">{twitt.username}</p>
            <p className="handle">{twitt.hastag}</p>
          </div>
        </div>
        <p className="twitt-text">{twitt.tweet_text}</p>
        {twitt.media && (
          <img
            className="media-preview"
            src={twitt.media}
            alt="twitt media"
            onClick={() => openModal(twitt.media)}
          />
        )}
        <p className="timestamp">{twitt.post_date}</p>
        {twitt.retweet && (
          <div className="retweets">
            <TweetContent
              twitt={twitt.retweet}
              showActions={false}
              isChained={true}
            />
          </div>
        )}
        {showActions && (
          <div className="action-buttons">
            <button className="action-button approve">Approve</button>
            <button className="action-button reject">Reject</button>
            <button className="action-button unknown">Unknown</button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={modalImage}
              alt="Enlarged twitt media"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TweetCard({ twitt }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (Array.isArray(twitt)) {
    // This is a chained twitt
    return (
      <div className="twitt-chain">
        <TweetContent twitt={twitt[0]} showActions={true} />
        <button className="chain-toggle" onClick={toggleExpand}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          {isExpanded ? "Hide" : "Show"} {twitt.length - 1} chained{" "}
          {twitt.length - 1 === 1 ? "twitt" : "tweets"}
        </button>
        {isExpanded && (
          <div className="chained-tweets">
            {twitt.slice(1).map((chainedTweet, index) => (
              <TweetContent
                key={chainedTweet.tweet_id}
                twitt={chainedTweet}
                showActions={false}
                isChained={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // This is a single twitt or a retweet
    return <TweetContent twitt={twitt} showActions={true} />;
  }
}

export default TweetCard;
