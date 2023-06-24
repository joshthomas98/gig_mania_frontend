import React from "react";

const ReviewSubjectBox = () => {
  return (
    <div className="text-light">
      <div className="review-box">
        <div className="review-image">
          <img
            src="https://lh5.googleusercontent.com/p/AF1QipM4xrWhXI4YycIGDFY_ccipmYwxF2cjTcIWZZUl"
            alt="Image"
          />
        </div>
        <div className="review-content">
          <h3 className="review-title mt-2">The Patriot</h3>
          <p className="review-description">
            Main St, Crumlin, Newport NP11 4PT <br />
            Wales, UK
          </p>
          <div className="review-rating">
            <span className="rating-stars">★★★★★</span>
            <span className="rating-value">5.0</span>
          </div>
          <div className="review-info">
            <span className="review-date">Share this venue:</span>
            <div className="row justify-content-center user-social-link mt-2">
              <div className="col-auto">
                <a target={"_blank"} href="https://www.facebook.com">
                  <i className="fa fa-facebook text-facebook" />
                </a>
              </div>
              <div className="col-auto">
                <a target={"_blank"} href="https://www.instagram.com">
                  <i className="fa fa-instagram text-instagram" />
                </a>
              </div>
              <div className="col-auto">
                <a target={"_blank"} href="https://www.twitter.com">
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

export default ReviewSubjectBox;
