import React, { useState, useEffect } from "react";

function TestFetch() {
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  const [bands, setBands] = useState([]);

  useEffect(() => {
    fetch(`${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/bands/`)
      .then((response) => response.json())
      .then((data) => setBands(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(bands);

  return (
    <div className="text-light">
      <h1>List of Bands</h1>
      <ul>
        {bands.map((band) => (
          <li key={band.id}>
            {band.band_name} + {band.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestFetch;
