import React from "react";

const ArtistReviewBox = ({ venueInfo }) => {
  const { image, venueName, address, facebook, youtube, twitter } = venueInfo;

  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  return (
    <div className="text-light">
      <div className="review-box">
        <div className="review-image">
          <img
            src={PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH + "/" + image}
            alt="Image"
          />
        </div>
        <div className="review-content">
          <h3 className="review-title mt-2">{venueName}</h3>
          <p className="review-description">{address}</p>
          <div className="review-rating">
            <span className="rating-stars">★★★★★</span>
            <span className="rating-value">5.0</span>
          </div>
          <div className="review-info">
            <span className="review-date">Share this venue:</span>
            <div className="row justify-content-center user-social-link mt-2">
              <div className="col-auto">
                <a target={"_blank"} href={facebook}>
                  <i className="fa fa-facebook text-facebook" />
                </a>
              </div>
              <div className="col-auto">
                <a target={"_blank"} href={youtube}>
                  <i className="fa fa-youtube text-youtube" />
                </a>
              </div>
              <div className="col-auto">
                <a target={"_blank"} href={twitter}>
                  <i className="fa fa-twitter text-twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistReviewBox;
