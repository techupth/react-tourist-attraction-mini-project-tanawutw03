import React from "react";

function PlaceTitle({ title, url }) {
  const handleTitleClick = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("No URL provided.");
    }
  };

  return (
    <p className="text-black-500 cursor-pointer" onClick={handleTitleClick}>
      {title}
    </p>
  );
}

export default PlaceTitle;
