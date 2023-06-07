import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({ userId, loginStatus }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && !loginStatus) {
      navigate("/artistorvenuesignin");
    }
  }, [userId, loginStatus, navigate]);

  return (
    <div className="text-light">
      <div className="container rounded bg-white mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="Profile"
              ></img>
              <span className="font-weight-bold mt-2">Edogaru</span>
              <label className="btn btn-secondary mt-3">
                Edit profile picture
                <input type="file" style={{ display: "none" }} />
              </label>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels mb-1">Band/Artist Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value=""
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label className="labels mb-1 mt-2">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email address"
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels mb-1 mt-2">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter username"
                  value=""
                />
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels mb-1">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels mb-1 mt-2">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels mb-1 mt-2">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    value=""
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Biography</span>
              </div>
              <div className="py-2">
                <textarea
                  placeholder="Enter bio"
                  style={{
                    width: "100%",
                    height: "200px",
                    paddingTop: "20px",
                    paddingLeft: "20px",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
