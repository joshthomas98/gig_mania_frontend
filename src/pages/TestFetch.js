import React, { useState, useEffect } from "react";

function App() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/bands/")
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
          <li key={band.id}>{band.band_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
