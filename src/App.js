import { createContext, useState, useEffect } from "react";

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
import ArtistAdvertiseGig from "./pages/ArtistAdvertiseGig";
import VenueAdvertiseGig from "./pages/VenueAdvertiseGig";
import UserCreated from "./pages/UserCreated";
import TestFetch from "./pages/TestFetch";
import ArtistOrVenueRegister from "./pages/ArtistOrVenueRegister";
import ContactUs from "./pages/ContactUs";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ArtistProfileSettings from "./pages/ArtistProfileSettings";
import VenueProfileSettings from "./pages/VenueProfileSettings";
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
import MembershipPlans from "./components/MembershipPlans";
import ArtistGigAdvert from "./components/ArtistGigAdvert";
import VenueGigAdvert from "./components/VenueGigAdvert";
import IndividualGig from "./pages/IndividualGig";
import GigApplicationSuccess from "./pages/GigApplicationSuccess";
import ArtistWriteReview from "./pages/ArtistWriteReview";
import VenueWriteReview from "./pages/VenueWriteReview";
import ThanksForReview from "./pages/ThanksForReview";
import StarRating from "./components/StarRating";
import ArtistReviewBox from "./components/ArtistReviewBox";
import VenueReviewBox from "./components/VenueReviewBox";
import SearchBar from "./components/SearchBar";
import ApplyForGig from "./pages/ApplyForGig";
import LoadingSpinner from "./components/LoadingSpinner";
import MyListedGigs from "./pages/MyListedGigs";
import ArtistEditGig from "./pages/ArtistEditGig";
import VenueEditGig from "./pages/VenueEditGig";
import GigSuccessfullyUpdated from "./pages/GigSuccessfullyUpdated";
import DeleteListedGigModal from "./components/DeleteListedGigModal";
import ProfileSuccessfullyUpdated from "./pages/ProfileSuccessfullyUpdated";
import AlreadyAppliedForGig from "./pages/AlreadyAppliedForGig";
import RequestToBookArtist from "./pages/RequestToBookArtist";
import BookingRequestSent from "./pages/BookingRequestSent";
import ArtistEditAvailability from "./pages/ArtistEditAvailability";
import UnavailabilityCreated from "./pages/UnavailabilityCreated";
import MyBookings from "./pages/MyBookings";
import RestrictedPage from "./pages/RestrictedPage";

import Footer from "./components/Footer";
import ConfirmGigApplicationModal from "./components/ConfirmGigApplicationModal";
import ArtistGigApplicationReview from "./pages/ArtistGigApplicationReview";
import { ArtistGigApplicationsProvider } from "./contexts/ArtistGigApplicationsContext";

export const LoginContext = createContext();

const App = () => {
  const [userId, setUserId] = useState(null);
  const [artistOrVenue, setArtistOrVenue] = useState(null);
  const loginContextValue = {
    userId,
    setUserId,
    artistOrVenue,
    setArtistOrVenue,
  };

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const artistOrVenueFromLocalStorage = localStorage.getItem("artistOrVenue");

    if (userIdFromLocalStorage && artistOrVenueFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
      setArtistOrVenue(artistOrVenueFromLocalStorage);
    }
  }, [setUserId, setArtistOrVenue]);

  return (
    <LoginContext.Provider value={loginContextValue}>
      <ArtistGigApplicationsProvider>
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

                <Route
                  path="artistadvertisegig"
                  element={<ArtistAdvertiseGig />}
                />

                <Route
                  path="venueadvertisegig"
                  element={<VenueAdvertiseGig />}
                />

                <Route path="usercreated" element={<UserCreated />} />

                <Route path="testfetch" element={<TestFetch />} />

                <Route
                  path="artistorvenueregister"
                  element={<ArtistOrVenueRegister />}
                />

                <Route path="contactus" element={<ContactUs />} />

                <Route path="termsofuse" element={<TermsOfUse />} />

                <Route path="privacy" element={<PrivacyPolicy />} />

                <Route
                  path="artistprofilesettings"
                  element={<ArtistProfileSettings />}
                />

                <Route
                  path="venueprofilesettings"
                  element={<VenueProfileSettings />}
                />

                <Route path="featuredartists" element={<FeaturedArtists />} />

                <Route
                  path="artistuserprofile/:profileId"
                  element={<ArtistUserProfile />}
                />

                <Route
                  path="venueuserprofile/:profileId"
                  element={<VenueUserProfile />}
                />

                <Route path="gigadvertised" element={<GigAdvertised />} />

                <Route
                  path="venuesearchforartist"
                  element={<VenueSearchForArtist />}
                />

                <Route
                  path="artistsearchresultcard/:resultId"
                  element={<ArtistSearchResultCard />}
                />

                <Route
                  path="newsletterthankyou"
                  element={<NewsletterThankYou />}
                />

                <Route path="testimonials" element={<Testimonials />} />

                <Route path="pickupgig" element={<PickUpGig />} />

                <Route path="membershipplans" element={<MembershipPlans />} />

                <Route path="artistgigadvert" element={<ArtistGigAdvert />} />

                <Route path="venuegigadvert" element={<VenueGigAdvert />} />

                <Route
                  path="/individualgig/:userType-listed/:gigId"
                  element={<IndividualGig />}
                />

                <Route
                  path="gigapplicationsuccess"
                  element={<GigApplicationSuccess />}
                />

                <Route
                  path="artistwritereview/"
                  element={<ArtistWriteReview />}
                />

                <Route path="venuewritereview" element={<VenueWriteReview />} />

                <Route path="thanksforreview" element={<ThanksForReview />} />

                <Route path="starrating" element={<StarRating />} />

                <Route path="artistreviewbox" element={<ArtistReviewBox />} />

                <Route path="venuereviewbox" element={<VenueReviewBox />} />

                <Route path="searchbar" element={<SearchBar />} />

                <Route path="applyforgig" element={<ApplyForGig />} />

                <Route path="loadingspinner" element={<LoadingSpinner />} />

                <Route path="mylistedgigs" element={<MyListedGigs />} />

                <Route
                  path="/artisteditgig/:gigId"
                  element={<ArtistEditGig />}
                />

                <Route path="/venueeditgig/:gigId" element={<VenueEditGig />} />

                <Route
                  path="deletelistedgigmodal"
                  element={<DeleteListedGigModal />}
                />

                <Route
                  path="gigsuccessfullyupdated"
                  element={<GigSuccessfullyUpdated />}
                />

                <Route
                  path="/profilesuccessfullyupdated"
                  element={<ProfileSuccessfullyUpdated />}
                />

                <Route
                  path="alreadyappliedforgig"
                  element={<AlreadyAppliedForGig />}
                />

                <Route
                  path="requesttobookartist/:resultId"
                  element={<RequestToBookArtist />}
                />

                <Route
                  path="bookingrequestsent"
                  element={<BookingRequestSent />}
                />

                <Route
                  path="artisteditavailability/:profileId"
                  element={<ArtistEditAvailability />}
                />

                <Route
                  path="unavailabilitycreated"
                  element={<UnavailabilityCreated />}
                />

                <Route path="mybookings" element={<MyBookings />} />

                <Route path="restrictedpage" element={<RestrictedPage />} />

                <Route
                  path="confirmgigapplicationmodal"
                  element={<ConfirmGigApplicationModal />}
                />

                <Route
                  path="artistgigapplicationreview"
                  element={<ArtistGigApplicationReview />}
                />
              </Routes>
            </BrowserRouter>
            <Footer />
          </div>
        </Container>
      </ArtistGigApplicationsProvider>
    </LoginContext.Provider>
  );
};

export default App;
