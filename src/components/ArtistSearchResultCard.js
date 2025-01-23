import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function ArtistSearchResultCard(props) {
  const navigate = useNavigate();
  const result = props.result;

  const SERVER_BASE_URL = "http://localhost:8000/";
  const PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH =
    "https://gigsweep-express.vercel.app/";

  const handleMoreInfoClick = () => {
    navigate(`/artistuserprofile/${result.id}`);
  };

  const handleBookNowClick = () => {
    navigate(`/requesttobook/${result.id}`);
  };

  console.log(result);

  return (
    <div className="artist-search-result-card-container">
      <Card className="text-light text-center" style={{ width: "20rem" }}>
        <Card.Img
          variant="top"
          src={PRODUCTION_BASE_URL_WITHOUT_TRAILING_SLASH + "/" + result.image}
        />
        <Card.Body>
          <Card.Title className="mb-3">{result.artist_name}</Card.Title>
          <Card.Text className="mb-3">{result.summary}</Card.Text>
          <Button
            onClick={handleMoreInfoClick}
            className="mx-2 mb-2 mt-2"
            variant="primary"
          >
            More info
          </Button>
          <Button
            className="mx-2 mb-2 mt-2"
            variant="primary"
            onClick={handleBookNowClick}
          >
            Request to book
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ArtistSearchResultCard;
