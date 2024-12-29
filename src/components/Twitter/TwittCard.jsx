import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import "../../css/Twitter/TwittCard.css";

function TwittContent({
  twitt,
  showActions,
  isChained = false,
  deleteTwitt,
  currentStatus,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  const handleSaveTwitt = () => {
    alert(`tweet saved, updateded twitt stastus to 1 for ${twitt.twitt_id}`); //TODO update twitt status to 1 via API
    deleteTwitt(twitt.twitt_id);
  };

  const handleAprovedTwitt = () => {
    alert(`approved twitt ${twitt.twitt_id}`); //TODO delete twitt via API
    deleteTwitt(twitt.twitt_id);
  };

  const handleDownloadTwitt = () => {
    alert(`Downloading tweet - ${twitt.twitt_id}`); //TODO update twitt status to 1 via API
  };

  const handleDeleteTwitt = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    // TODO delete twitt via API
    deleteTwitt(twitt.twitt_id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

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
            <p className="handle">@{twitt.username}</p>
          </div>
          {showActions && (
            <button
              className="delete-button"
              onClick={handleDeleteTwitt}
              title="Delete tweet"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
        <p className="twitt-text">{twitt.twitt_text}</p>
        <div className="twitt-media">
          {twitt.media &&
            twitt.media.map((mediaLink, index) =>
              isVideo(mediaLink) ? (
                <video
                  key={index}
                  width="100%"
                  controls
                  className="media-preview"
                >
                  <source src={mediaLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  key={index}
                  className="media-preview"
                  src={mediaLink}
                  alt={`twitt media ${index}`}
                  onClick={() => openModal(mediaLink)}
                />
              )
            )}
        </div>
        <p className="timestamp">{twitt.post_date}</p>
        {twitt.retwitt && (
          <div className="retwitts">
            <TwittContent
              key={twitt.retwitt.twitt_id}
              twitt={twitt.retwitt}
              showActions={false}
              isChained={true}
              currentStatus={currentStatus}
            />
          </div>
        )}
        {showActions && (
          <div className="action-buttons">
            {currentStatus === 0 && (
              <>
                {/* <button
                  className="action-button approve"
                  onClick={() => handleAprovedTwitt()}
                >
                  Approve
                </button> */}
                <button
                  className="action-button save"
                  onClick={() => handleSaveTwitt()}
                >
                  Add to watchlist
                </button>
              </>
            )}
            {currentStatus === 1 && (
              <>
                <button
                  className="action-button download"
                  onClick={() => handleDownloadTwitt()}
                >
                  Download Tweet
                </button>
              </>
            )}
          </div>
        )}
        {showDeleteConfirm && (
          <div className="delete-confirm-overlay" onClick={handleCancelDelete}>
            <div className="delete-confirm-popup">
              <p>Are you sure you want to delete this tweet?</p>
              <div className="delete-confirm-actions">
                <button onClick={handleConfirmDelete}>Delete</button>
                <button onClick={handleCancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content-box">
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

function TwittCard({ twitt, deleteTwitt, currentStatus }) {
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
          deleteTwitt={deleteTwitt}
          currentStatus={currentStatus}
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
                deleteTwitt={deleteTwitt}
                currentStatus={currentStatus}
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
        deleteTwitt={deleteTwitt}
        currentStatus={currentStatus}
      />
    );
  }
}

export default TwittCard;
