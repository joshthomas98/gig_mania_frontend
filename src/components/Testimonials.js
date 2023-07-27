import React from "react";

const Testimonials = () => {
  return (
    <>
      <div id="testimonials" className="px-5 pb-5 text-light">
        <div className="container">
          <h2 className="text-center text-white">Testimonials</h2>
          <p className="lead text-center text-white mb-5">
            We think you'll love GigSweep, but don't just take our word for it.
            See what our users have to say about our service.
          </p>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Jake</h3>
                  <p className="card-text">
                    "GigSweep is a lifesaver! I had a gig cancellation, but
                    within hours, I found a replacement by picking up a gig from
                    another artist and had a great night. Thank you, GigSweep!"
                    - Jake, Musician
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/11.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Sarah</h3>
                  <p className="card-text">
                    "As a busy venue manager, GigSweep simplified my life. I
                    easily discovered talented bands with availability on
                    specific dates, helping me book fantastic acts for my
                    venue." - Sarah, Venue Manager
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Alex</h3>
                  <p className="card-text">
                    "GigSweep revolutionized my gig hunting! I discovered
                    incredible opportunities and connected with gigs I wouldn't
                    have found elsewhere. This platform is a true game-changer
                    for musicians like me." - Alex G, Musician
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Emily</h3>
                  <p className="card-text">
                    "GigSweep keeps me in the loop with my favorite bands'
                    upcoming shows. It's my go-to platform for finding when and
                    where they're playing in my local area. Highly recommended!"
                    - Emily S, Music Fan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
