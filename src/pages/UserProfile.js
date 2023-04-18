import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ userId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/profilesettings");
  };

  const [availabilities, setavailabilities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/availabilities/${userId}`)
      .then((response) => response.json())
      .then((data) => setavailabilities(data))
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <>
      <h1 className="text-light text-center">My Profile</h1>

      <section className="text-light">
        <div className="row py-5 px-4">
          <div className="col-lg-8 mx-auto">
            <div className="bg-dark shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-end profile-head text-center">
                  <div className="profile mr-3">
                    <img
                      src="https://scontent-lcy1-1.xx.fbcdn.net/v/t1.6435-9/161891220_375450380499891_7491581544665288192_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=THcfRx9chTkAX9ETGYD&_nc_ht=scontent-lcy1-1.xx&oh=00_AfDwny0G-K6KrYbgz0d8dRUmhhPVR8OB518BYeOJFdA4Kg&oe=64655195"
                      alt="..."
                      width={130}
                      className="rounded mb-2 img-thumbnail"
                    />
                  </div>
                  <div className="media-body text-white">
                    <h4 className="mt-3">Cancel The Transmission</h4>
                    <p>Caerphilly</p>
                  </div>
                  <a
                    href="/profilesettings"
                    className="btn btn-outline-dark btn-sm btn-block text-light"
                  >
                    Edit profile
                  </a>
                </div>
              </div>
              <div className="bg-dark p-4 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">215</h5>
                    <small className="text-light">Photos</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">745</h5>
                    <small className="text-light">Followers</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">340</h5>
                    <small className="text-light">Following</small>
                  </li>
                </ul>
              </div>
              <div className="px-4 py-3 text-center">
                <h5 className="mb-2">About</h5>
                <div className="p-4 rounded shadow-sm bg-dark">
                  <p className="font-italic mb-0">Web Developer</p>
                  <p className="font-italic mb-0">Lives in New York</p>
                  <p className="font-italic mb-0">Photographer</p>
                </div>
              </div>
              <div className="p-5 text-center">
                <h2>Calendar Here</h2>
                <p>rtcfyvgubhfcvg</p>
              </div>
              <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Recent photos</h5>
                  <a href="#" className="btn btn-link text-light">
                    Show all
                  </a>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-2 pr-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 mb-2 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 pr-lg-1 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-light py-5">
        <h1>Test availability fetch</h1>
        <div className="text-light">
          <h3>List of availabilities:</h3>
          <ul>
            {availabilities.map((availability) => (
              <li key={availabilities.id}>
                {availability.band} + {availability.date}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfile;