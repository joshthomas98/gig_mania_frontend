import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginContext } from "../App";

function BookArtistPage() {
  const { userId, setUserId, artistOrVenue, setArtistOrVenue } =
    useContext(LoginContext);

  const navigate = useNavigate();

  // if (!userId || (artistOrVenue !== "V" && artistOrVenue !== "A")) {
  //   navigate("/signin");
  // } else if (userId && artistOrVenue === "A") {
  //   navigate("/restrictedpage");
  // } else if (userId === null && artistOrVenue === null) {
  //   navigate("/signin");
  // }

  useEffect(() => {
    if (!userId || (artistOrVenue !== "V" && artistOrVenue !== "A")) {
      navigate("/signin");
    } else if (userId && artistOrVenue === "A") {
      navigate("/restrictedpage");
    }
  }, [userId, artistOrVenue, navigate]);

  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCountyChange = (event) => {
    setCounty(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to filter and show artists based on user's input
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

  if (userId && artistOrVenue === "V") {
    return (
      <div className="container-fluid">
        <h1 className="text-white px-3">Book an Artist</h1>
        <Form onSubmit={handleSubmit} className="rounded-3 w-50">
          <Form.Group className="p-3">
            <Form.Label className="text-white">Select a Country:</Form.Label>
            <Form.Select value={country} onChange={handleCountryChange}>
              <option value="">Please select a country</option>
              <option value="England">England</option>
              <option value="Wales">Wales</option>
              <option value="Scotland">Scotland</option>
              <option value="Northern Ireland">Northern Ireland</option>
            </Form.Select>
          </Form.Group>

          {country === "England" && (
            <Form.Group className="p-3">
              <Form.Label className="text-white">Select a County:</Form.Label>
              <Form.Select value={county} onChange={handleCountyChange}>
                <option value="">Please select a county</option>
                {countiesInEngland.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {country === "Wales" && (
            <Form.Group className="p-3">
              <Form.Label className="text-white">Select a County:</Form.Label>
              <Form.Select value={county} onChange={handleCountyChange}>
                <option value="">Please select a county</option>
                {countiesInWales.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {country === "Scotland" && (
            <Form.Group className="p-3">
              <Form.Label className="text-white">Select a County:</Form.Label>
              <Form.Select value={county} onChange={handleCountyChange}>
                <option value="">Please select a county</option>
                {countiesInScotland.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {country === "Northern Ireland" && (
            <Form.Group className="p-3">
              <Form.Label className="text-white">Select a County:</Form.Label>
              <Form.Select value={county} onChange={handleCountyChange}>
                <option value="">Please select a county</option>
                {countiesInNorthernIreland.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="p-3">
            <Form.Label className="text-white">Select a Genre:</Form.Label>
            <Form.Select value={genre} onChange={handleGenreChange}>
              <option value="">Please select a genre</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="country">Country</option>
              <option value="hip-hop">Hip hop</option>
              <option value="r&b">R&B</option>
              <option value="electronic">Electronic</option>
              <option value="classical">Classical</option>
              <option value="reggae">Reggae</option>
              <option value="metal">Metal</option>
              <option value="folk">Folk</option>
              <option value="blues">Blues</option>
              <option value="world-music">World Music</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="p-3">
            <Form.Label className="text-white">Maximum Price:</Form.Label>
            <Form.Control
              placeholder="£"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </Form.Group>
          <Button className="my-3 mx-3" variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </div>
    );
  }
}

export default BookArtistPage;
