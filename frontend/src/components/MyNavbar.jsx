import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Person, Cart3, Globe, Search } from "react-bootstrap-icons";

import { Link } from "react-router-dom";

function MyNavbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/wines?search=${search}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, navigate]);
  return (
    <>
      <Navbar expand="lg" className="wine-navbar py-3">
        <Container fluid className="px-5">
          {/* LOGO */}
          <Navbar.Brand as={Link} to="/" className="wine-logo">
            WineHub
          </Navbar.Brand>

          {/* SEARCH BAR */}
          <div className="search-container">
            <form>
              <InputGroup>
                <Form.Control
                  placeholder="Descrivi cosa stai cercando"
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button type="button" className="search-icon">
                  <Search />
                </button>
              </InputGroup>
            </form>
          </div>

          {/* ICONS */}
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center gap-1">
              <span>IT</span>
              <Globe size={20} />
            </div>

            <Link to="/profile" className="nav-icon">
              <Person size={26} />
            </Link>

            <Link to="/cart" className="nav-icon">
              <Cart3 size={26} />
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* MENU SOTTO */}
      <div className="wine-menu">
        <Container fluid className="px-5">
          <Nav className="justify-content-center gap-5">
            <Nav.Link as={Link} to="/wines?category=WHITE">
              Bianchi
            </Nav.Link>

            <Nav.Link as={Link} to="/wines?category=RED">
              Rossi
            </Nav.Link>

            <Nav.Link as={Link} to="/wines?category=SPARKLING">
              Spumanti
            </Nav.Link>

            <Nav.Link as={Link} to="/wines">
              Tutti i vini
            </Nav.Link>

            <Nav.Link as={Link} to="/favorites">
              Preferiti
            </Nav.Link>

            <Nav.Link as={Link} to="/orders">
              Ordini
            </Nav.Link>

            <Nav.Link as={Link} to="/my-wines">
              I miei vini
            </Nav.Link>
          </Nav>
        </Container>
      </div>
    </>
  );
}

export default MyNavbar;
