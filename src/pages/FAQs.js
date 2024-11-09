import React, { useState } from "react";

const FAQs = () => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);
  const [faq6, setFaq6] = useState(false);
  const [faq7, setFaq7] = useState(false);
  const [faq8, setFaq8] = useState(false);
  const [faq9, setFaq9] = useState(false);
  const [faq10, setFaq10] = useState(false);

  return (
    <div className="text-light">
      <h1 className="text-light pb-3 px-3">FAQs</h1>
      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq1(!faq1)}>
          <h4>1. What is GigSweep?</h4>
          {faq1 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq1 && (
          <div className="faq-content">
            <p>
              GigSweep is an all-in-one live music platform that allows artists
              and venues to connect, interact, and book gigs. It features artist
              and venue profiles, gig listings, review systems, and more to
              facilitate seamless gig scheduling and collaboration.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq2(!faq2)}>
          <h4>2. How does GigSweep work for artists?</h4>
          {faq2 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq2 && (
          <div className="faq-content">
            <p>
              Artists can create profiles to showcase themselves with details
              such as their name, genre, and upcoming gigs. They can list gigs
              they can no longer perform at, allowing other artists to apply for
              the slot. Artists can also search for available gigs and apply
              based on their preferences (e.g., payment, location, genre). They
              can leave reviews of venues they've performed at, which are
              screened for offensive content.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq3(!faq3)}>
          <h4>3. How does GigSweep work for venues?</h4>
          {faq3 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq3 && (
          <div className="faq-content">
            <p>
              Venues can create profiles where they list upcoming dates they
              need artists for. They can search for artists by genre, location,
              and other criteria to find performers that meet their needs.
              Venues can also leave reviews for artists that have played at
              their venue. Reviews are filtered for offensive content using AI
              before posting.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq4(!faq4)}>
          <h4>
            4. What’s the difference between the standard and pro accounts?
          </h4>
          {faq4 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq4 && (
          <div className="faq-content">
            <p>
              GigSweep offers both standard and pro accounts for artists and
              venues. Standard accounts include basic features like profile
              creation and gig searching. Pro accounts unlock additional
              functionalities such as advanced filtering, premium visibility on
              searches, and more detailed analytics.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq5(!faq5)}>
          <h4>5. How much does it cost to use GigSweep?</h4>
          {faq5 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq5 && (
          <div className="faq-content">
            <p>
              Currently, GigSweep is free for all users. However, we may
              introduce paid features in the future, particularly for pro tier
              accounts, to cover operational costs.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq6(!faq6)}>
          <h4>6. How do I sign up for GigSweep?</h4>
          {faq6 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq6 && (
          <div className="faq-content">
            <p>
              You can sign up by clicking the 'Sign Up' button on the homepage.
              You will need to provide basic information like your name, email,
              and password. Once you’ve signed up, you can start using the
              platform right away.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq7(!faq7)}>
          <h4>7. Can I use GigSweep on my phone?</h4>
          {faq7 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq7 && (
          <div className="faq-content">
            <p>
              Yes! GigSweep has a mobile application available on both Android
              and iOS, which can be downloaded from the Google Play Store and
              the App Store. The app offers all the same features and
              functionality as the website, allowing you to manage your gigs and
              profiles on the go.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq8(!faq8)}>
          <h4>8. How do reviews work on GigSweep?</h4>
          {faq8 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq8 && (
          <div className="faq-content">
            <p>
              Both artists and venues can leave reviews of each other after a
              gig. Reviews are checked by AI for profanity and hate speech
              before they are posted. This ensures that the platform remains a
              safe and professional space for all users.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq9(!faq9)}>
          <h4>9. How do I apply for gigs on GigSweep?</h4>
          {faq9 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq9 && (
          <div className="faq-content">
            <p>
              Artists can browse available gigs listed by other artists or
              venues using filters such as distance, genre, and payment. When
              you find a gig that suits your requirements, you can apply for it
              directly through the platform. The venue or original artist will
              then review your application.
            </p>
          </div>
        )}
      </div>

      <div className="faq-item">
        <div className="faq-title" onClick={() => setFaq10(!faq10)}>
          <h4>10. How do I contact support?</h4>
          {faq10 ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {faq10 && (
          <div className="faq-content">
            <p>
              If you need help or have a question, you can contact us by
              clicking the 'Contact Us' button on the homepage or by sending an
              email to support@gigsweep.com. We’ll get back to you as soon as
              possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;
