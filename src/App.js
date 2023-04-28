import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import ArtistRegister from "./pages/ArtistRegister";
import VenueRegister from "./pages/VenueRegister";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import ArtistSignIn from "./pages/ArtistSignIn";
import VenueSignIn from "./pages/VenueSignIn";
import BandSearch from "./pages/BandSearch";
import AdvertiseGig from "./pages/AdvertiseGig";
import UserCreated from "./pages/UserCreated";
import TestFetch from "./pages/TestFetch";
import ArtistOrVenueRegister from "./pages/ArtistOrVenueRegister";
import ArtistOrVenueSignIn from "./pages/ArtistOrVenueSignIn";
import ContactUs from "./pages/ContactUs";
import ProfileSettings from "./pages/ProfileSettings";
import BrowseProfiles from "./pages/BrowseProfiles";
import ArtistUserProfile from "./pages/ArtistUserProfile";
import VenueUserProfile from "./pages/VenueUserProfile";
import GigAdvertised from "./pages/GigAdvertised";
import SuccessAnimation from "./components/SuccessAnimation";
import ProfileCards from "./components/ProfileCards";

import Footer from "./components/Footer";

function App() {
  const [userId, setUserId] = useState(null);

  function handleUserIdChange(id) {
    setUserId(id);
  }

  return (
    <Container>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="artistregister" element={<ArtistRegister />} />
            <Route path="venueregister" element={<VenueRegister />} />
            <Route path="about" element={<About />} />
            <Route path="faqs" element={<FAQs />} />

            <Route
              path="artistsignin"
              element={<ArtistSignIn onUserIdChange={handleUserIdChange} />}
            />

            <Route
              path="venuesignin"
              element={<VenueSignIn onUserIdChange={handleUserIdChange} />}
            />

            <Route path="bandsearch" element={<BandSearch />} />

            <Route
              path="advertisegig"
              element={<AdvertiseGig onUserIdChange={handleUserIdChange} />}
            />

            <Route path="usercreated" element={<UserCreated />} />
            <Route path="testfetch" element={<TestFetch />} />

            <Route
              path="artistorvenueregister"
              element={<ArtistOrVenueRegister />}
            />

            <Route
              path="artistorvenuesignin"
              element={<ArtistOrVenueSignIn />}
            />

            <Route path="contactus" element={<ContactUs />} />

            <Route path="profilesettings" element={<ProfileSettings />} />

            <Route path="browseprofiles" element={<BrowseProfiles />} />

            <Route
              path="/artistuserprofile"
              element={<ArtistUserProfile userId={userId} />}
            />

            <Route
              path="/venueuserprofile"
              element={<VenueUserProfile userId={userId} />}
            />

            <Route path="gigadvertised" element={<GigAdvertised />} />
            <Route path="profilecards" element={<ProfileCards />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
