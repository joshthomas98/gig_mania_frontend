import React, { createContext, useContext, useState } from "react";

const ArtistGigApplicationsContext = createContext();

export const useArtistGigApplications = () =>
  useContext(ArtistGigApplicationsContext);

export const ArtistGigApplicationsProvider = ({ children }) => {
  const [artistGigApplications, setArtistGigApplications] = useState([]);

  const updateArtistGigApplications = (newApplications) => {
    setArtistGigApplications(newApplications);
  };

  return (
    <ArtistGigApplicationsContext.Provider
      value={{ artistGigApplications, updateArtistGigApplications }}
    >
      {children}
    </ArtistGigApplicationsContext.Provider>
  );
};
