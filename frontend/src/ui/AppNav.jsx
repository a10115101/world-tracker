import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

function AppNav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link className="navbar-brand" to="/">
          World Tracker
        </Link>
        <Nav className="ms-auto">
          <Link className="nav-link active" to="/login">
            Login
          </Link>
          <Link className="nav-link active" to="/signup">
            Signup
          </Link>
          <Link className="nav-link active" to="/map">
            Map
          </Link>
          <Link className="nav-link active" to="/profile">
            Profile
          </Link>
          <Link className="nav-link active" to="/">
            Logout
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNav;
