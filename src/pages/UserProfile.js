import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/profilesettings");
  };

  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "230px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src="https://scontent-lcy1-1.xx.fbcdn.net/v/t1.6435-9/161891220_375450380499891_7491581544665288192_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cyGfD38QZtsAX8mRebR&_nc_ht=scontent-lcy1-1.xx&oh=00_AfCL66aCsZGVXtf820vxC8IEAIBFsitIHzVkfTyEVwv6uA&oe=6445AD95"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-4"
                      style={{ width: "150px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light mt-1"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: 1, color: "white" }}
                      onClick={handleButtonClick}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>Cancel The Transmission</h5>
                    <p>Caerphilly</p>
                  </div>
                </div>
                <div className="px-4 bg-gray">
                  <div className="d-flex justify-content-end text-center py-3">
                    <div>
                      <p className="mb-1 h5 text-secondary">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5 text-secondary">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5 text-secondary">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body px-4 py-1 text-white">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4 bg-gray">
                      <p className="font-italic mb-1">
                        Cancel The Transmission is a Welsh hard rock band formed
                        in 2015. The band, consisting of Justin Crowe, Josh
                        Thomas, Carl Oag, and Ash Preece, aims to bring back
                        rock music to the mainstream. Their style combines
                        classic and modern rock influences, creating feel-good
                        hard rock anthems. The band's debut EP, Back To The
                        Start, received praise from various websites and radio
                        stations, and their debut album, Live It Up, gained
                        support from the New Wave of Classic Rock community.
                        Cancel The Transmission's live shows and festival
                        appearances in the UK have contributed to their rise in
                        popularity.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1"
                        className="w-100 rounded-3 mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
