import React, { useState } from "react";

const Form = () => {
  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [dateOfGig, setDateOfGig] = useState("");
  const [startTime, setStartTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bandName">Band Name:</label>
        <input
          type="text"
          id="bandName"
          value={bandName}
          onChange={(event) => setBandName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dateOfGig">Date of Gig:</label>
        <input
          type="text"
          id="dateOfGig"
          value={dateOfGig}
          onChange={(event) => setDateOfGig(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="text"
          id="startTime"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="reason">Reason:</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
