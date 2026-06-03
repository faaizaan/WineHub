import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Person, Cart3, Globe, Search } from "react-bootstrap-icons";
import { fetchMe } from "../services/api";

function MyNavbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const data = await fetchMe();

        if (data) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (search.trim() === "") return;

    const timeout = setTimeout(() => {
      navigate(`/wines?search=${search}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, navigate]);

  return (
    <>
      <Navbar expand="lg" className="wine-navbar py-3">
        <Container fluid className="px-5">
          <Navbar.Brand as={Link} to="/" className="wine-logo">
            WineHub
          </Navbar.Brand>

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

          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center gap-1">
              <span>IT</span>
              <Globe size={20} />
            </div>

            <Link to="/profile" className="nav-icon">
              <Person size={26} />
            </Link>

            <Link to="/cart" className="nav-icon position-relative">
              <Cart3 size={26} />

              {cartQuantity > 0 && (
                <span className="cart-badge">{cartQuantity}</span>
              )}
            </Link>
          </div>
        </Container>
      </Navbar>

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

            {user && (
              <>
                <Nav.Link as={Link} to="/favorites">
                  Preferiti
                </Nav.Link>

                <Nav.Link as={Link} to="/orders">
                  Ordini
                </Nav.Link>
              </>
            )}

            {(user?.role === "SELLER" || user?.role === "ADMIN") && (
              <Nav.Link as={Link} to="/my-wines">
                I miei vini
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </div>
    </>
  );
}

export default MyNavbar;
