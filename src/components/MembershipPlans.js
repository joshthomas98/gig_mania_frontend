import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const MembershipPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    const state = { membershipType: buttonId };

    if (buttonId === 1 || buttonId === 3) {
      navigate("/artistregister", { state });
    } else if (buttonId === 2 || buttonId === 4) {
      navigate("/venueregister", { state });
    } else {
      navigate("/", { state });
    }
  };

  const renderButton = (buttonId, buttonText) => {
    const isSelected = selectedButton === buttonId;
    const buttonLabel = isSelected ? "Selected" : "Select";

    return (
      <Button
        className="mt-4 mb-3"
        onClick={() => handleClick(buttonId)}
        disabled={isSelected}
      >
        {buttonLabel}
      </Button>
    );
  };

  return (
    <div className="pt-3">
      <h1 className="text-light text-center mb-4">
        STEP 1 OF 3: Select your membership type
      </h1>
      <h2 className="text-light text-center mb-5">
        See our different membership options
      </h2>
      <div className="text-light d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-6">
            <Card className="mx-3" style={{ width: "28rem" }}>
              <Card.Body>
                <h2 className="text-center" style={{ color: "#89CFF0" }}>
                  Artists
                </h2>
                <h4 className="text-center mt-3">GigSweep Standard</h4>
                <Card.Text className="text-left mt-4">
                  <h6 className="text-light text-left px-3 mb-3 lead">
                    GigSweep Standard benefits
                  </h6>
                  <ul className="text-light mt-2">
                    <li>
                      Advertise unplayable gigs for other artists to pick up
                    </li>
                    <li>Search and apply for gigs based on your criteria</li>
                    <li>Promote music, connect with other artists.</li>
                    <li>See reviews of venues before you agree to play</li>
                    <li>Manage gig records and prevent double booking.</li>
                    <li>Time-saving booking process</li>
                  </ul>
                  <p className="text-center mt-4 lead">
                    Price: £2.99 per month
                  </p>
                  <p className="text-center">
                    No contracts, no commitments, cancel at anytime. Membership
                    is in the form of a rolling monthly subscription
                  </p>
                </Card.Text>
                <div className="text-center">{renderButton(1, "Select")}</div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
            <Card className="mx-3" style={{ width: "28rem" }}>
              <Card.Body>
                <h2 className="text-center" style={{ color: "#89CFF0" }}>
                  Venues
                </h2>
                <h4 className="text-center mt-3">GigSweep Standard</h4>
                <Card.Text className="text-left mt-4">
                  <h6 className="text-light text-left px-3 mb-3 lead">
                    GigSweep Standard benefits
                  </h6>

                  <ul className="text-light mt-2">
                    <li>List gigs and let artists apply to play.</li>
                    <li>Discover local and national talent easily.</li>
                    <li>Contact artists and notify fans of upcoming gigs.</li>
                    <li>Provide feedback on artists you've had perform</li>
                    <li>Record keeping system to prevent double booking</li>
                    <li>Time-saving booking process</li>
                  </ul>
                  <p className="text-center mt-4 lead">
                    Price: £4.99 per month
                  </p>
                  <p className="text-center">
                    No contracts, no commitments, cancel at anytime. Membership
                    is in the form of a rolling monthly subscription
                  </p>
                </Card.Text>
                <div className="text-center">{renderButton(2, "Select")}</div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-light d-flex justify-content-center align-items-center mt-5">
        <div className="row">
          <div className="col-md-6">
            <Card className="mx-3" style={{ width: "28rem" }}>
              <Card.Body>
                <h2 className="text-center" style={{ color: "#89CFF0" }}>
                  Artists
                </h2>
                <h4 className="text-center mt-3">GigSweep Pro</h4>
                <Card.Text className="text-left mt-4">
                  <h6 className="text-light text-left px-3 mb-3 lead">
                    GigSweep Pro benefits
                  </h6>
                  <p className="px-3">
                    As an Artist Pro member you will get everything included in
                    the standard membership plus extra features such as:
                  </p>
                  <ul className="text-light mt-2">
                    <li>Early email notifications for new gigs.</li>
                    <li>Increased homepage exposure as a featured artist.</li>
                    <li>Verified bluetick for credibility and more visits.</li>
                    <li>Improved chances of getting booked</li>
                    <li>Increased exposure for your music</li>
                  </ul>
                  <p className="text-center mt-4 lead">
                    Price: £4.49 per month
                  </p>
                  <p className="text-center">
                    No contracts, no commitments, cancel at anytime. Membership
                    is in the form of a rolling monthly subscription
                  </p>
                </Card.Text>
                <div className="text-center">{renderButton(3, "Select")}</div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
            <Card className="mx-3" style={{ width: "28rem" }}>
              <Card.Body>
                <h2 className="text-center" style={{ color: "#89CFF0" }}>
                  Venues
                </h2>
                <h4 className="text-center mt-3">GigSweep Pro</h4>
                <Card.Text className="text-left mt-4">
                  <h6 className="text-light text-left px-3 mb-3 lead">
                    GigSweep Pro benefits
                  </h6>
                  <p className="px-3">
                    As a Venue Pro member you will get everything included in
                    the standard membership plus extra features such as:
                  </p>
                  <ul className="text-light mt-2">
                    <li>
                      Email notifications about local artists and availability.
                    </li>
                    <li>Priority placement in artist search results.</li>
                    <li>Verified bluetick for credibility and more visits.</li>
                    <li>Recommendations of artists you may want to book.</li>
                    <li>Increased exposure for your venue</li>
                  </ul>
                  <p className="text-center mt-4 lead">
                    Price: £7.49 per month
                  </p>
                  <p className="text-center">
                    No contracts, no commitments, cancel at anytime. Membership
                    is in the form of a rolling monthly subscription
                  </p>
                </Card.Text>
                <div className="text-center">{renderButton(4, "Select")}</div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
