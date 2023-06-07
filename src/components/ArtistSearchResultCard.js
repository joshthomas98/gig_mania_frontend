import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArtistSearchResultCard(props) {
  const result = props.result;

  return (
    <div className="artist-search-result-card-container">
      <Card className="text-light text-center" style={{ width: "20rem" }}>
        <Card.Img
          variant="top"
          src="https://scontent.fbrs4-1.fna.fbcdn.net/v/t1.6435-9/161891220_375450380499891_7491581544665288192_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-lo-hKiTrM4AX_xgLid&_nc_ht=scontent.fbrs4-1.fna&oh=00_AfDxuRxhtDTVOvAMXagUQWLVW4BYQeUbVClggFpSHOSrrQ&oe=6484F595"
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
