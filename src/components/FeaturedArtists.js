import React, { useState, useEffect } from "react";

const FeaturedArtists = () => {
  const [featuredArtists, setFeaturedArtists] = useState([]);

  const SERVER_BASE_URL = "http://localhost:8000";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/featuredartists/`
        );
        const data = await response.json();
        setFeaturedArtists(data);
        console.log(featuredArtists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedArtists();
  }, []);

  return (
    <>
      <div className="container text-light text-center">
        <h2 className="mb-5">Featured Artists</h2>
        <div className="row">
          {featuredArtists.map((artist, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <div className="card user-card">
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src={SERVER_BASE_URL + artist.image}
                      className="img-radius img-fluid"
                      alt="User-Profile-Image"
                    />
                  </div>
                  <h5 className="f-w-600 m-t-25 m-b-10 text-light mt-3">
                    {artist.artist_name}
                  </h5>
                  <p className="text-muted">
                    Active | Band | Formed: 10.01.2015
                  </p>
                  <hr />
                  <p className="container m-t-15 text-light">
                    {artist.summary}
                  </p>
                  <hr />
                  <div className="row justify-content-center user-social-link mb-3">
                    <div className="col-auto">
                      <a target={"_blank"} href={artist.facebook}>
                        <i className="fa fa-facebook text-facebook" />
                      </a>
                    </div>
                    <div className="col-auto">
                      <a target={"_blank"} href={artist.twitter}>
                        <i className="fa fa-twitter text-twitter" />
                      </a>
                    </div>
                    <div className="col-auto">
                      <a target={"_blank"} href={artist.youtube}>
                        <i className="fa fa-youtube text-youtube" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <h3 className="pt-5">List of featured artists:</h3>
          <ul>
            {featuredArtists.map((featuredArtist, index) => (
              <li key={index}>{featuredArtist.artist_name}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default FeaturedArtists;
