import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ArtistRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const membershipType = location.state?.membershipType;
  const [artistMembershipType] = useState(membershipType);

  const getArtistMembershipName = () => {
    if (artistMembershipType === 1) {
      return "Artist standard";
    } else if (artistMembershipType === 3) {
      return "Artist pro";
    }
  };

  useEffect(() => {
    console.log(artistMembershipType);
  });

  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [typeOfArtist, setTypeOfArtist] = useState("");
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
    formData.append("artist_name", artistName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phoneNumber);
    formData.append("bio", bio);
    formData.append("summary", summary);
    formData.append("genre", genre);
    formData.append("country", country);
    formData.append("county", county);
    formData.append("type_of_artist", typeOfArtist);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("youtube", youtube);
    formData.append("artist_membership_type", artistMembershipType);

    // Send the FormData object in the request
    fetch("http://localhost:8000/artists/", {
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

  const artistStepTwoMessage = () => {
    if (membershipType === 1) {
      return (
        <h3 className="text-light mb-4">
          Great choice! You've selected Artist Standard Membership.
        </h3>
      );
    } else if (membershipType === 3) {
      return (
        <h3 className="text-light mb-4">
          Great choice! You've selected Artist Pro Membership.
        </h3>
      );
    }
  };

  return (
    <div>
      <h1 className="text-light mb-4">STEP 2 OF 3: Register as an artist</h1>

      {artistStepTwoMessage()}

      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="artistName" className="text-light mb-2">
            Artist Name:
          </label>
          <input
            type="text"
            placeholder="Enter your artist name here"
            className="form-control"
            id="artistName"
            value={artistName}
            onChange={(event) => setArtistName(event.target.value)}
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
          <label htmlFor="summary" className="text-light mb-2 mt-3">
            Summary:
          </label>
          <input
            type="text"
            placeholder="Short version of your bio"
            className="form-control"
            id="summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="text-light mb-2 mt-3">
            Genre:
          </label>
          <select
            className="form-control"
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="">Select a genre</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Country">Country</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Classical">Classical</option>
            <option value="Reggae">Reggae</option>
            <option value="Metal">Metal</option>
            <option value="Folk">Folk</option>
            <option value="Blues">Blues</option>
            <option value="World Music">World Music</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country" className="text-light mb-2 mt-3">
            Country:
          </label>
          <select
            className="form-control"
            id="country"
            placeholder="What country are you from?"
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
          <label htmlFor="typeOfArtist" className="text-light mb-2 mt-3">
            Type of artist:
          </label>
          <select
            className="form-control"
            id="typeOfArtist"
            value={typeOfArtist}
            onChange={(event) => setTypeOfArtist(event.target.value)}
          >
            <option value="">Select a genre</option>
            <option value="Full band">Full band</option>
            <option value="Solo artist">Solo artist</option>
            <option value="Duo">Duo</option>
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
          <label
            htmlFor="artistMembershipType"
            className="text-light mb-2 mt-3"
          >
            Membership Type:
          </label>
          <input
            type="text"
            id="artistMembershipType"
            className="form-control"
            value={getArtistMembershipName()}
            readOnly
            style={{ backgroundColor: "#f8f9fa", color: "#6c757d" }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ArtistRegister;
