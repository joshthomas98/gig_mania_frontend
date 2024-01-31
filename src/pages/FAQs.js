import React, { useState } from "react";

const FAQs = () => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);
  const [faq6, setFaq6] = useState(false);
  const [faq7, setFaq7] = useState(false);

  return (
    <div className="text-light">
      <h1 className="text-light pb-3 px-3">FAQs</h1>
      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq1(!faq1)}>
          <h3>1. What is your website all about?</h3>
          {faq1 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq1 && (
          <div className="faq-content">
            <p>
              Our website is a platform that connects musicians/bands, music
              venues, and fans. Musicians/bands can advertise gigs they can no
              longer play, and other artists can take over those gigs. Music
              venues can find local bands with availability on specific dates
              and book them for their venue. Fans can find out when and where
              their favourite bands are next playing in the local area.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq2(!faq2)}>
          <h3>2. How does your website work for musicians/bands?</h3>
          {faq2 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq2 && (
          <div className="faq-content">
            <p>
              Musicians/bands can log on to the website and advertise gigs that
              they can no longer play. They can provide details about the gig,
              such as the date, time, location, and type of music. Other artists
              can then browse the available gigs and apply to take them over.
              Once the gig is taken, the original band can remove the listing
              from the website.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq3(!faq3)}>
          <h3>3. How does your website work for music venues?</h3>
          {faq3 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq3 && (
          <div className="faq-content">
            <p>
              Music venues can log on to the website and search for local bands
              with availability on specific dates. They can filter their search
              by location, genre, and date. Once they find a suitable band, they
              can contact them through the website to book them for their venue.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq4(!faq4)}>
          <h3>4. How does your website work for fans?</h3>
          {faq4 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq4 && (
          <div className="faq-content">
            <p>
              Fans can log on to the website and search for their favourite
              bands. They can see when and where those bands are next playing in
              the local area. They can also search for new bands to discover and
              attend their gigs.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq5(!faq5)}>
          <h3>5. How much does it cost to use your website?</h3>
          {faq5 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq5 && (
          <div className="faq-content">
            <p>
              Our website is currently free to use for all users. However, we
              may introduce paid features in the future to cover our costs.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq6(!faq6)}>
          <h3>6. How do I sign up for your website?</h3>
          {faq6 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq6 && (
          <div className="faq-content">
            <p>
              You can sign up for our website by clicking on the 'Sign Up'
              button on the homepage. You will need to provide some basic
              information, such as your name, email address, and password. Once
              you have signed up, you can start using the website right away.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq7(!faq7)}>
          <h3>7. How do I contact you if I have a question or problem?</h3>
          {faq7 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq7 && (
          <div className="faq-content">
            <p>
              You can contact us by clicking on the 'Contact Us' button on the
              homepage. You can also send us an email at support@gigsweep.com.
              We will do our best to respond to your inquiry as soon as
              possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;
