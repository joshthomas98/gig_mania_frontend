import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const MembershipPlans = () => {
  const navigate = useNavigate();

  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app";

  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  const [membershipOptions, setMembershipOptions] = useState([]);

  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const fetchMembershipOptions = async () => {
      try {
        const response = await fetch(
          `${PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH}/membershipoptions/`
        );
        const data = await response.json();
        setMembershipOptions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembershipOptions();
  }, []);

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

  console.log(membershipOptions);

  return !storedUserId ? (
    <div className="pt-3">
      <h1 className="text-light text-center mb-4">
        STEP 1 OF 3: Select your membership type
      </h1>
      <h2 className="text-light text-center mb-5">
        See our different membership options
      </h2>
      <div className="text-light d-flex justify-content-center align-items-center">
        <div className="row">
          {membershipOptions.map((membership, index) => (
            <div className="col-md-3 d-flex justify-content-center" key={index}>
              <Card className="mb-5" style={{ width: "28rem" }}>
                <Card.Body>
                  <h2 className="text-center" style={{ color: "#89CFF0" }}>
                    {membership.type_of_user}
                  </h2>
                  <h4 className="text-center mt-3">{membership.title}</h4>
                  <Card.Text className="text-left mt-4">
                    <h6 className="text-light text-center px-3 mb-3 lead">
                      {membership.membership_id === 1 ||
                      membership.membership_id === 2
                        ? "GigSweep Standard benefits:"
                        : membership.membership_id === 3 ||
                          membership.membership_id === 4
                        ? "GigSweep Pro benefits:"
                        : "Invalid membership option"}
                    </h6>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: membership.description,
                      }}
                    />
                    <p className="text-center mt-4 lead">{membership.price}</p>
                    <p className="text-center">{membership.disclosure}</p>
                  </Card.Text>

                  <div className="text-center">
                    {renderButton(membership.membership_id, "Select")}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default MembershipPlans;
