import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="d-flex align-items-center justify-content-between mt-3">
      <p className="text-muted">Copyright © 2023 Gig Mania</p>

      <a href="#" className="bottom-0 end-0 mb-4">
        <i className="bi bi-arrow-up-circle h1"></i>
      </a>

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
    </footer>
  );
};

export default Footer;
