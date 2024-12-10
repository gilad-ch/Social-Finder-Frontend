import React from "react";

function PlatformInProgress({ platform }) {
  return (
    <div className="in-working-message">
      <h3>{platform} integration is in progress</h3>
      <p>
        We're working hard to bring you content from {platform}. Please check
        back soon!
      </p>
    </div>
  );
}

export default PlatformInProgress;
