import React from "react";

const StarRating = ({ selectedRating, setSelectedRating }) => {
  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  return (
    <div className="rating">
      <span
        className={`star ${selectedRating >= 1 ? "lit" : ""}`}
        data-value="1"
        onClick={() => handleStarClick(1)}
      ></span>
      <span
        className={`star ${selectedRating >= 2 ? "lit" : ""}`}
        data-value="2"
        onClick={() => handleStarClick(2)}
      ></span>
      <span
        className={`star ${selectedRating >= 3 ? "lit" : ""}`}
        data-value="3"
        onClick={() => handleStarClick(3)}
      ></span>
      <span
        className={`star ${selectedRating >= 4 ? "lit" : ""}`}
        data-value="4"
        onClick={() => handleStarClick(4)}
      ></span>
      <span
        className={`star ${selectedRating >= 5 ? "lit" : ""}`}
        data-value="5"
        onClick={() => handleStarClick(5)}
      ></span>
    </div>
  );
};

export default StarRating;
