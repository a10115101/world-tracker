import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

function Homepage() {
  return (
    <Container
      fluid
      className="mt-4 px-3 border border-dark"
      style={{ height: "500px" }}
    >
      <Row className="">
        <Col md={5} className="">
          <Image src="/logo.png" fluid rounded />
          <p className="lh-lg mt-3">
            Every wonderful journey is memorable, we can record the visited
            places on the map, and create a unique mark for you on the map, and
            share it with your friends
          </p>
          <Button className="mx-auto" variant="dark" size="lg">
            Start Right Now!
          </Button>
        </Col>
        <Col md={7} className="">
          <Image src="/background.jpg" fluid rounded className="mt-2" />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
