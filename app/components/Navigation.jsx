 import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img src="logo.png" alt="Logo" width="100px" height="auto" />
        </Navbar.Brand>
        <Nav className="ml-auto">
          </Nav>
          <Nav className="ml-auto">
          <Button variant="outline-primary">
                <BsSearch />
              </Button>
            <Nav.Link as={Link} to="/login" className="mx-2">
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="mx-2">
              Sign Up
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
