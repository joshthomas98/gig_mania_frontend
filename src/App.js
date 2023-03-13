import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ArtistRegister from "./pages/ArtistRegister";
import VenueRegister from "./pages/VenueRegister";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import SubmitGig from "./pages/SubmitGig";
import SignIn from "./pages/SignIn";
import BandSearch from "./pages/BandSearch";
import AdvertiseGig from "./pages/AdvertiseGig";
import UserCreated from "./pages/UserCreated";
import TestFetch from "./pages/TestFetch";
import ArtistOrVenue from "./pages/ArtistOrVenue";
import ContactUs from "./pages/ContactUs";

import UserContextProvider from "./UserContext";
import Footer from "./components/Footer";

function App() {
  return (
    <UserContextProvider>
      <Container>
        <div className="App">
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="artistregister" element={<ArtistRegister />} />
              <Route path="venueregister" element={<VenueRegister />} />
              <Route path="login" element={<LogIn />} />
              <Route path="about" element={<About />} />
              <Route path="faqs" element={<FAQs />} />
              <Route path="submitgig" element={<SubmitGig />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="bandsearch" element={<BandSearch />} />
              <Route path="advertisegig" element={<AdvertiseGig />} />
              <Route path="usercreated" element={<UserCreated />} />
              <Route path="testfetch" element={<TestFetch />} />
              <Route path="artistorvenue" element={<ArtistOrVenue />} />
              <Route path="contactus" element={<ContactUs />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </Container>
    </UserContextProvider>
  );
}

export default App;
