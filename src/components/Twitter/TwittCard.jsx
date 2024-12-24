import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../../css/Twitter/TwittCard.css";

function TwittContent({
  twitt,
  showActions,
  isChained = false,
  updateTwittStatus,
  deleteTwitt
}) {
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

  const handleUpdateTwittStatus = (selectedStatus) => {
    alert(`updateded twitt stastus for ${twitt.twitt_id} to ${selectedStatus}`);
    updateTwittStatus();
  };

  const handleAprovedTwitt = () =>
  {
    deleteTwitt(twitt.twitt_id);    
  }

  const isVideo = (media) => {
    return media.includes(".mp4");
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
        <div className="twitt-media">
          {twitt.media &&
            (isVideo(twitt.media) ? (
              <video width="100%" controls className="media-preview">
                <source src={twitt.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="media-preview"
                src={twitt.media}
                alt="twitt media"
                onClick={() => openModal(twitt.media)}
              />
            ))}
        </div>
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
              onClick={() => handleAprovedTwitt()}
            >
              Approve
            </button>
            <button
              className="action-button reject"
              onClick={() => handleUpdateTwittStatus(2)}
            >
              Save
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

function TwittCard({ twitt, updateTwittStatus, deleteTwitt }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (twitt.chained_twitts) {
    // This a chained twitt
    return (
      <div className="twitt-chain">
        <TwittContent
          twitt={twitt}
          showActions={true}
          updateTwittStatus={updateTwittStatus}
          deleteTwitt={deleteTwitt}
        />
        <button className="chain-toggle" onClick={toggleExpand}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          {isExpanded ? "Hide" : "Show"} {twitt.chained_twitts.length} chained{" "}
          {twitt.chained_twitts.length === 1 ? "twitt" : "twitts"}
        </button>
        {isExpanded && (
          <div className="chained-twitts">
            {twitt.chained_twitts.map((chainedTwitt, index) => (
              <TwittContent
                key={chainedTwitt.twitt_id}
                twitt={chainedTwitt}
                showActions={false}
                isChained={true}
                updateTwittStatus={updateTwittStatus}
                deleteTwitt={deleteTwitt}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    //normal twitt
    return (
      <TwittContent
        twitt={twitt}
        showActions={true}
        updateTwittStatus={updateTwittStatus}
        deleteTwitt={deleteTwitt}
      />
    );
  }
}

export default TwittCard;
