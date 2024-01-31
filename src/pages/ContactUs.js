import React from "react";

function ContactUs() {
  return (
    <>
      <section className="contact-us-section text-center text-light pb-5">
        <h1>Contact Us</h1>
      </section>
      <div className="contact-us-container text-light">
        <section className="contact-us-section">
          <h3>Email</h3>
          <p>contact@gigsweep.com</p>
        </section>

        <section className="contact-us-section">
          <h3>Phone</h3>
          <p>+44-XXXX-XXX-XXX</p>
        </section>

        <section className="contact-us-section">
          <h3>Postal Address</h3>
          <p>
            GigSweep Inc.
            <br />
            123 Main Street
            <br />
            Anytown, UK
            <br />
            12345
          </p>
        </section>

        <section className="contact-us-section">
          <h3>Social Media</h3>
          <p>
            We're very active on all of our social media platforms so why not
            get in touch with us? You'll find the links to our socials in the
            footer at the bottom of the page.
          </p>
        </section>
      </div>
    </>
  );
}

export default ContactUs;
