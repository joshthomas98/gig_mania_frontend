import Carousel from "react-bootstrap/Carousel";

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../../images/carousel1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Flexible Gigging for Musicians</h3>
          <p>
            As a musician, sometimes your schedule changes and you can't play a
            gig you've already booked. Our platform helps you find other artists
            to take your place and swap gigs with others, ensuring you never
            miss out on an opportunity.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../../images/carousel2.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Book Top Talent</h3>
          <p>
            Running a music venue can be a challenge, but we make it easy to
            book talented artists for your events. Find the right band for your
            venue and ensure your patrons have a great time.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../../images/carousel3.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Never Miss a Beat</h3>
          <p>
            If you're a music lover, you won't want to miss any upcoming shows
            or events. Our platform makes it simple to stay up-to-date on local
            concerts and discover new artists to follow.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
