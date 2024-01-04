import React from "react";
import { useNavigate } from "react-router-dom";

function ReadMore(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.url) {
      if (
        props.url.startsWith("http") &&
        !props.url.includes(window.location.host)
      ) {
        window.open(props.url, "_blank");
      } else {
        navigate(props.url);
      }
    } else {
      console.error("No URL provided.");
    }
  };

  return (
    <button className="text-blue-500" onClick={handleClick}>
      อ่านต่อ
    </button>
  );
}

export default ReadMore;
