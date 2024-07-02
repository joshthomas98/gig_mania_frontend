import React from "react";
import { Container } from "react-bootstrap";

const ArtistGigApplicationReview = () => {
  return (
    <>
      <h1 className="text-light text-center">Artist Gig Application Review</h1>

      <section>
        <Container className="w-75 text-center mt-4">
          <p className="text-light">
            From this page you are able to either approve or decline
            applications that other artists have submitted to take over a gig
            from the original artist who is no longer able to perform. Below you
            can view the original gig details, new artist application for the
            gig and make the decision to approve or decline the new artist to
            perform instead.
          </p>
        </Container>
      </section>

      <section className="text-light">
        <h3>Gig Details:</h3>
      </section>
    </>
  );
};

export default ArtistGigApplicationReview;
