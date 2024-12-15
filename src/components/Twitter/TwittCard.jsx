import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../../css/Twitter/TwittCard.css";

function TwittContent({ twitt, showActions, isChained = false }) {
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

  const updateTwittStatus = (selectedStatus) => {
    alert(`updateded twitt stastus to ${selectedStatus}`);
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
        <p className="twitt-text">{twitt.twitt_text}</p>
        {twitt.media && (
          <img
            className="media-preview"
            src={twitt.media}
            alt="twitt media"
            onClick={() => openModal(twitt.media)}
          />
        )}
        <p className="timestamp">{twitt.post_date}</p>
        {twitt.retwitt && (
          <div className="retwitts">
            <TwittContent
              key={twitt.retwitt.twitt_id}
              twitt={twitt.retwitt}
              showActions={false}
              isChained={true}
            />
          </div>
        )}
        {showActions && (
          <div className="action-buttons">
            <button
              className="action-button approve"
              onClick={() => updateTwittStatus(1)}
            >
              Approve
            </button>
            <button
              className="action-button reject"
              onClick={() => updateTwittStatus(2)}
            >
              Reject
            </button>
            <button
              className="action-button unknown"
              onClick={() => updateTwittStatus(3)}
            >
              Unknown
            </button>
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

function TwittCard({ twitt }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (Array.isArray(twitt)) {
    // This a chained twitt
    return (
      <div className="twitt-chain">
        <TwittContent twitt={twitt[0]} showActions={true} />
        <button className="chain-toggle" onClick={toggleExpand}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          {isExpanded ? "Hide" : "Show"} {twitt.length - 1} chained{" "}
          {twitt.length - 1 === 1 ? "twitt" : "twitts"}
        </button>
        {isExpanded && (
          <div className="chained-twitts">
            {twitt.slice(1).map((chainedTwitt, index) => (
              <TwittContent
                key={chainedTwitt.twitt_id}
                twitt={chainedTwitt}
                showActions={false}
                isChained={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return <TwittContent twitt={twitt} showActions={true} />;
  }
}

export default TwittCard;
