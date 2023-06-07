import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-light text-left pb-3">
            GigSweep - Built by a musician, for musicians.
          </h2>

          <section className="text-light">
            <p>
              GigSweep was established in 2023 by musician and developer Josh
              Thomas with the goal of creating a platform that connects
              musicians, venues, and fans. Our website provides a unique
              opportunity for musicians and bands to promote their gigs and
              connect with other artists in the same locality.
            </p>
          </section>

          <section className="text-light">
            <p>
              GigSweep aims to solve the problem of musicians who have gigs
              booked but can no longer play due to various reasons. Our platform
              allows these musicians to log in and advertise their gigs, and
              other artists can pick up those gigs instead, giving them a chance
              to showcase their talent and grow their fan base.
            </p>
          </section>

          <section className="text-light">
            <p>
              For venues looking to book local talent, GigSweep provides a
              convenient and easy-to-use platform to find bands that are
              available to perform on certain dates. The website features a
              search function that allows venue managers to find musicians based
              on location, genre, and availability.
            </p>
          </section>

          <section className="text-light">
            <p>
              At GigSweep, we understand the importance of fans in the music
              industry. That's why our website also provides a feature that
              allows fans to keep track of their favourite bands and where they
              are playing next in the local area. This feature ensures that fans
              never miss a performance from their favourite artists.
            </p>
          </section>

          <section className="text-light">
            <p>
              We believe that GigSweep can revolutionise the way musicians,
              venues, and fans interact with each other. Our website is designed
              to be user-friendly and easy to navigate, ensuring a seamless
              experience for everyone. Join us today and be a part of the future
              of live music.
            </p>
          </section>
        </div>

        <div className="col-md-6 d-flex justify-content-end">
          <img
            src="../../images/gigsweep_logo.png"
            width="100%"
            height="auto"
            alt="Gig Mania Logo"
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
