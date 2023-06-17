import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArtistSearchResultCard(props) {
  const result = props.result;

  return (
    <div className="artist-search-result-card-container">
      <Card className="text-light text-center" style={{ width: "20rem" }}>
        <Card.Img
          variant="top"
          src={
            "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/299097849_10224862540887972_2194412836427010382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2BomWAHwWkoAX9SoAIN&_nc_ht=scontent-man2-1.xx&oh=00_AfCO6Qyb-6ljFvutuPUeTYdR-kPurtq0vvnihB76JVXi2g&oe=648D0FF2"
          }
        />
        <Card.Body>
          <Card.Title className="mb-3">{result.artist_name}</Card.Title>
          <Card.Text className="mb-3">{result.summary}</Card.Text>
          <Button className="mx-2 mb-2 mt-2" variant="primary">
            More info
          </Button>
          <Button className="mx-2 mb-2 mt-2" variant="primary">
            Book now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ArtistSearchResultCard;
