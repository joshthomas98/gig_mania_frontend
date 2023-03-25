import React from "react";

const ProfileSettings = () => {
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
              <span className="text-black-50">edogaru@mail.com.my</span>
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
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels mb-1 mt-2">Education</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="education"
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
                <span>Edit Experience</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;Experience
                </span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels mb-1">Experience in Designing</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  value=""
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels mb-1">Additional Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="additional details"
                  value=""
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
