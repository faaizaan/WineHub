import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            WineHub
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/wines">
                Vini
              </Nav.Link>

              <NavDropdown title="Area utente" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profilo
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/favorites">
                  Preferiti
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/orders">
                  Ordini
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item as={Link} to="/my-wines">
                  I miei vini
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/create-wine">
                  Crea vino
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                Registrati
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default MyNavbar;
