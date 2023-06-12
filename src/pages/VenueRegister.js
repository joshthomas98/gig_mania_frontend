import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ArtistRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const membershipType = location.state?.membershipType;
  const [venueMembershipType] = useState(membershipType);

  const getVenueMembershipName = () => {
    if (venueMembershipType === 2) {
      return "Venue standard";
    } else if (venueMembershipType === 4) {
      return "Venue pro";
    }
  };

  useEffect(() => {
    console.log(venueMembershipType);
  });

  const [venueName, setVenueName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [typeOfAct, setTypeOfAct] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append the image file to the FormData object
    formData.append("image", image);

    // Append the other data fields to the FormData object
    formData.append("venue_name", venueName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phoneNumber);
    formData.append("bio", bio);
    formData.append("country", country);
    formData.append("county", county);
    formData.append("type_of_act", typeOfAct);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("youtube", youtube);
    formData.append("venue_membership_type", venueMembershipType);

    // Send the FormData object in the request
    fetch("http://localhost:8000/venues/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate("/usercreated");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCountyChange = (event) => {
    setCounty(event.target.value);
  };

  const countiesInEngland = [
    "Bedfordshire",
    "Berkshire",
    "Bristol",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "Cornwall",
    "Cumbria",
    "Derbyshire",
    "Devon",
    "Dorset",
    "Durham",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Greater London",
    "Greater Manchester",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Isle of Wight",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Merseyside",
    "Norfolk",
    "North Yorkshire",
    "Northamptonshire",
    "Northumberland",
    "Nottinghamshire",
    "Oxfordshire",
    "Rutland",
    "Shropshire",
    "Somerset",
    "South Yorkshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Tyne and Wear",
    "Warwickshire",
    "West Midlands",
    "West Sussex",
    "West Yorkshire",
    "Wiltshire",
    "Worcestershire",
  ];

  const countiesInWales = [
    "Blaenau Gwent",
    "Bridgend",
    "Caerphilly",
    "Cardiff",
    "Carmarthenshire",
    "Ceredigion",
    "Conwy",
    "Denbighshire",
    "Flintshire",
    "Gwynedd",
    "Isle of Anglesey",
    "Merthyr Tydfil",
    "Monmouthshire",
    "Neath Port Talbot",
    "Newport",
    "Pembrokeshire",
    "Powys",
    "Rhondda Cynon Taff",
    "Swansea",
    "Torfaen",
    "Vale of Glamorgan",
    "Wrexham",
  ];

  const countiesInScotland = [
    "Aberdeen City",
    "Aberdeenshire",
    "Angus",
    "Argyll and Bute",
    "Clackmannanshire",
    "Dumfries and Galloway",
    "Dundee City",
    "East Ayrshire",
    "East Dunbartonshire",
    "East Lothian",
    "East Renfrewshire",
    "Edinburgh",
    "Falkirk",
    "Fife",
    "Glasgow",
    "Highland",
    "Inverclyde",
    "Midlothian",
    "Moray",
    "Na h-Eileanan Siar",
    "North Ayrshire",
    "North Lanarkshire",
    "Orkney Islands",
    "Perth and Kinross",
    "Renfrewshire",
    "Scottish Borders",
    "Shetland Islands",
    "South Ayrshire",
    "South Lanarkshire",
    "Stirling",
    "West Dunbartonshire",
    "West Lothian",
  ];

  const countiesInNorthernIreland = [
    "Antrim",
    "Armagh",
    "Down",
    "Fermanagh",
    "Londonderry",
    "Tyrone",
  ];

  useEffect(() => {
    console.log(membershipType);
  });

  const venueStepTwoMessage = () => {
    if (membershipType === 2) {
      return (
        <h3 className="text-light mb-4">
          Great choice! You've selected Venue Standard Membership.
        </h3>
      );
    } else if (membershipType === 4) {
      return (
        <h3 className="text-light mb-4">
          Great choice! You've selected Venue Pro Membership.
        </h3>
      );
    }
  };

  return (
    <div>
      <h1 className="text-light mb-4">STEP 2 OF 3: Register as a venue</h1>

      {venueStepTwoMessage()}

      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="artistName" className="text-light mb-2">
            Venue Name:
          </label>
          <input
            type="text"
            placeholder="Enter the name of your venue here"
            className="form-control"
            id="venueName"
            value={venueName}
            onChange={(event) => setVenueName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-light mb-2 mt-3">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-light mb-2 mt-3">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password here"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" className="text-light mb-2 mt-3">
            Phone Number:
          </label>
          <input
            type="text"
            placeholder="Enter your phone number here"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="text-light mb-2 mt-3">
            Bio:
          </label>
          <input
            type="text"
            placeholder="Create an artist bio"
            className="form-control"
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="text-light mb-2 mt-3">
            Country:
          </label>
          <select
            className="form-control"
            id="country"
            placeholder="What country is your venue in?"
            value={country}
            onChange={handleCountryChange}
          >
            <option disabled hidden value="">
              Select a country
            </option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
            <option value="Scotland">Scotland</option>
            <option value="Northern Ireland">Northern Ireland</option>
          </select>
        </div>

        {country === "England" && (
          <div className="form-group mb-2 mt-3">
            <label className="text-white" htmlFor="county">
              County:
            </label>
            <select
              className="form-control"
              id="county"
              value={county}
              onChange={handleCountyChange}
            >
              <option disabled hidden value="">
                Select a county
              </option>
              {countiesInEngland.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}

        {country === "Wales" && (
          <div className="form-group mb-2 mt-3">
            <label className="text-white" htmlFor="county">
              County:
            </label>
            <select
              className="form-control"
              id="county"
              value={county}
              onChange={handleCountyChange}
            >
              <option disabled hidden value="">
                Select a county
              </option>
              {countiesInWales.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}

        {country === "Scotland" && (
          <div className="form-group mb-2 mt-3">
            <label className="text-white" htmlFor="county">
              Select a County:
            </label>
            <select
              className="form-control"
              id="county"
              value={county}
              onChange={handleCountyChange}
            >
              <option disabled hidden value="">
                Select a county
              </option>
              {countiesInScotland.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}

        {country === "Northern Ireland" && (
          <div className="form-group mb-2 mt-3">
            <label className="text-white" htmlFor="county">
              Select a County:
            </label>
            <select
              className="form-control"
              id="county"
              value={county}
              onChange={handleCountyChange}
            >
              <option disabled hidden value="">
                Select a county
              </option>
              {countiesInNorthernIreland.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="typeOfAct" className="text-light mb-2 mt-3">
            Type of act:
          </label>
          <select
            className="form-control"
            id="typeOfAct"
            value={typeOfAct}
            onChange={(event) => setTypeOfAct(event.target.value)}
          >
            <option value="">
              What type of act do you have at your venue?
            </option>
            <option value="Original Music">Original Music</option>
            <option value="Covers">Covers</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="facebook" className="text-light mb-2 mt-3">
            Facebook:
          </label>
          <input
            type="text"
            placeholder="Enter your Facebook URL here"
            className="form-control"
            id="facebook"
            value={facebook}
            onChange={(event) => setFacebook(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="twitter" className="text-light mb-2 mt-3">
            Twitter:
          </label>
          <input
            type="text"
            placeholder="Enter your Twitter URL here"
            className="form-control"
            id="twitter"
            value={twitter}
            onChange={(event) => setTwitter(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="youtube" className="text-light mb-2 mt-3">
            YouTube:
          </label>
          <input
            type="text"
            placeholder="Enter your YouTube URL here"
            className="form-control"
            id="youtube"
            value={youtube}
            onChange={(event) => setYoutube(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="text-light mb-2 mt-3">
            Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="image"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="venueMembershipType" className="text-light mb-2 mt-3">
            Membership Type:
          </label>
          <input
            type="text"
            id="venueMembershipType"
            className="form-control"
            value={getVenueMembershipName()}
            readOnly
            style={{ backgroundColor: "#f8f9fa", color: "#6c757d" }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Purchase membership
        </button>
      </form>
    </div>
  );
}

export default ArtistRegister;
