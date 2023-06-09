import { createContext, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import ArtistRegister from "./pages/ArtistRegister";
import VenueRegister from "./pages/VenueRegister";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import SignIn from "./pages/SignIn";
import ArtistSearch from "./pages/ArtistSearch";
import AdvertiseGig from "./pages/AdvertiseGig";
import UserCreated from "./pages/UserCreated";
import TestFetch from "./pages/TestFetch";
import ArtistOrVenueRegister from "./pages/ArtistOrVenueRegister";
import ContactUs from "./pages/ContactUs";
import ProfileSettings from "./pages/ProfileSettings";
import FeaturedArtists from "./components/FeaturedArtists";
import ArtistUserProfile from "./pages/ArtistUserProfile";
import VenueUserProfile from "./pages/VenueUserProfile";
import GigAdvertised from "./pages/GigAdvertised";
import IncorrectLoginModal from "./components/IncorrectLoginModal";
import VenueSearchForArtist from "./pages/VenueSearchForArtist";
import ArtistSearchResultCard from "./components/ArtistSearchResultCard";
import NewsletterThankYou from "./pages/NewsletterThankYou";
import Testimonials from "./components/Testimonials";
import PickUpGig from "./pages/PickUpGig";

import Footer from "./components/Footer";

export const LoginContext = createContext();

const App = () => {
  const [userId, setUserId] = useState(true);
  const [artistOrVenue, setArtistOrVenue] = useState(true);
  const loginContextValue = {
    userId,
    setUserId,
    artistOrVenue,
    setArtistOrVenue,
  };

  return (
    <LoginContext.Provider value={loginContextValue}>
      <Container>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Homepage />} />

              <Route path="artistregister" element={<ArtistRegister />} />

              <Route path="venueregister" element={<VenueRegister />} />

              <Route path="about" element={<About />} />

              <Route path="faqs" element={<FAQs />} />

              <Route
                path="incorrectloginmodal"
                element={<IncorrectLoginModal />}
              />

              <Route path="signin" element={<SignIn />} />

              <Route path="artistsearch" element={<ArtistSearch />} />

              <Route path="advertisegig" element={<AdvertiseGig />} />

              <Route path="usercreated" element={<UserCreated />} />

              <Route path="testfetch" element={<TestFetch />} />

              <Route
                path="artistorvenueregister"
                element={<ArtistOrVenueRegister />}
              />

              <Route path="contactus" element={<ContactUs />} />

              <Route path="profilesettings" element={<ProfileSettings />} />

              <Route path="featuredartists" element={<FeaturedArtists />} />

              <Route path="artistuserprofile" element={<ArtistUserProfile />} />

              <Route path="venueuserprofile" element={<VenueUserProfile />} />

              <Route path="gigadvertised" element={<GigAdvertised />} />

              <Route
                path="venuesearchforartist"
                element={<VenueSearchForArtist />}
              />

              <Route
                path="artistsearchresultcard"
                element={<ArtistSearchResultCard />}
              />

              <Route
                path="newsletterthankyou"
                element={<NewsletterThankYou />}
              />

              <Route path="testimonials" element={<Testimonials />} />

              <Route path="pickupgig" element={<PickUpGig />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </Container>
    </LoginContext.Provider>
  );
};

export default App;
