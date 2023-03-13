import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__top--left">
          <div className="d-flex mb-3">
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

            <a
              target={"_blank"}
              href="https://www.linkedin.com"
              className="social-icon linkedin-icon mr-3 h2 px-1"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="footer__top--right">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="/contactus">Contact Us</a>
            </li>
            <li className="footer__item">
              <a href="/faqs">FAQs</a>
            </li>
            <li className="footer__item">
              <a href="/about">About</a>
            </li>
            <li className="footer__item">
              <a href="termsofuse">Terms of Use</a>
            </li>
            <li className="footer__item">
              <a href="/privacypolicy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="footer__bottom"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <p className="footer__text" style={{ marginRight: "auto" }}>
          &copy; {new Date().getFullYear()} GigSweep
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="#">
            <i className="bi bi-arrow-up-circle h1"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
