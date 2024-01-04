import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";

const ClipBoard = (props) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.textToCopy);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy URL to clipboard!");
    }
  };

  return (
    <div className="absolute bottom-0 right-0 cursor-pointer">
      <i className="fa-regular fa-clipboard" onClick={handleCopy}></i>
    </div>
  );
};

export default ClipBoard;
