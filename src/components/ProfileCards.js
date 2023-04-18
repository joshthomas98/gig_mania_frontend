import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ProfileCards = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card p-0">
              <div className="card-image">
                <img
                  src="https://scontent-lcy1-1.xx.fbcdn.net/v/t39.30808-6/327023560_764328148439869_4724881192811973705_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=OqKtgH43YjsAX8OX6Gq&_nc_ht=scontent-lcy1-1.xx&oh=00_AfBndxZxaQC_jyLcW9vHdbEDYqgq9SuyutgXixsSmTzhkQ&oe=6442CEDD"
                  alt
                />
              </div>
              <div className="card-content d-flex flex-column align-items-center pb-3">
                <h4 className="p-2">Cancel The Transmission</h4>
                <h5>Rock</h5>
                <ul className="social-icons d-flex justify-content-center">
                  <li style={{ "--i": "1" }}>
                    <a
                      target={"_blank"}
                      href="https://www.facebook.com"
                      className="social-icon facebook-icon mr-3 h2 px-1"
                    >
                      <FaFacebook />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.instagram.com"
                      className="social-icon instagram-icon mr-3 h2 px-1"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.twitter.com"
                      className="social-icon twitter-icon mr-3 h2 px-1"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-0">
              <div className="card-image">
                <img
                  src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/332201090_515365007376342_6255178787984989573_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=m7dLOGw5-bYAX-yQa8F&_nc_ht=scontent-man2-1.xx&oh=00_AfDBAgrNwQBxGZGqwBRZtFoiKlHYsh0SyOChyjDxfm9rAQ&oe=64449611"
                  alt
                />
              </div>
              <div className="card-content d-flex flex-column align-items-center pb-3">
                <h4 className="p-2">Those Damn Crows</h4>
                <h5>Rock</h5>
                <ul className="social-icons d-flex justify-content-center">
                  <li style={{ "--i": "1" }}>
                    <a
                      target={"_blank"}
                      href="https://www.facebook.com"
                      className="social-icon facebook-icon mr-3 h2 px-1"
                    >
                      <FaFacebook />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.instagram.com"
                      className="social-icon instagram-icon mr-3 h2 px-1"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.twitter.com"
                      className="social-icon twitter-icon mr-3 h2 px-1"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-0">
              <div className="card-image">
                <img
                  src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/326762361_466580555686975_5962304836519852758_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=GbIwBZ5rtioAX-UuwE3&_nc_ht=scontent-man2-1.xx&oh=00_AfCkxgvREp6GVEyluRUpPDS-FpMd-77sNriMAzFlbD3nKw&oe=64438347"
                  alt
                />
              </div>
              <div className="card-content d-flex flex-column align-items-center pb-3">
                <h4 className="p-2">Mad Haven</h4>
                <h5>Rock</h5>
                <ul className="social-icons d-flex justify-content-center">
                  <li style={{ "--i": "1" }}>
                    <a
                      target={"_blank"}
                      href="https://www.facebook.com"
                      className="social-icon facebook-icon mr-3 h2 px-1"
                    >
                      <FaFacebook />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.instagram.com"
                      className="social-icon instagram-icon mr-3 h2 px-1"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.twitter.com"
                      className="social-icon twitter-icon mr-3 h2 px-1"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
