import React from "react";

const About = () => {
  return (
    <div className="container">
      <section className="text-center">
        <img
          className="img-fluid pb-5"
          src="../../images/gigsweepabout.png"
          alt="aaaaaa"
          style={{ width: "1000px", height: "500px" }}
        />
      </section>

      <section className="text-light text-center pb-3">
        <h2>Welcome to GigSweep - The Gigging Gateway!</h2>
      </section>

      <div className="text-container pb-3">
        <section className="text-light text-center">
          <p>
            GigSweep was established in 2023 by musician and developer Josh
            Thomas with the goal of creating a platform that connects musicians,
            venues, and fans. Our website provides a unique opportunity for
            musicians and bands to promote their gigs and connect with other
            artists in the same locality.
          </p>
        </section>

        <section className="text-light text-center">
          <p>
            GigSweep aims to solve the problem of musicians who have gigs booked
            but can no longer play due to various reasons. Our platform allows
            these musicians to log in and advertise their gigs, and other
            artists can pick up those gigs instead, giving them a chance to
            showcase their talent and grow their fan base.
          </p>
        </section>

        <section className="text-light text-center">
          <p>
            For venues looking to book local talent, GigSweep provides a
            convenient and easy-to-use platform to find bands that are available
            to perform on certain dates. The website features a search function
            that allows venue managers to find musicians based on location,
            genre, and availability.
          </p>
        </section>

        <section className="text-light text-center">
          <p>
            At GigSweep, we understand the importance of fans in the music
            industry. That's why our website also provides a feature that allows
            fans to keep track of their favourite bands and where they are
            playing next in the local area. This feature ensures that fans never
            miss a performance from their favourite artists.
          </p>
        </section>

        <section className="text-light text-center">
          <p>
            We believe that GigSweep can revolutionize the way musicians,
            venues, and fans interact with each other. Our website is designed
            to be user-friendly and easy to navigate, ensuring a seamless
            experience for everyone. Join us today and be a part of the future
            of live music.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
