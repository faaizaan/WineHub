import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Person, Cart3, Globe, Search } from "react-bootstrap-icons";
import { fetchMe } from "../services/api";

function MyNavbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const resetSearch = () => {
    setSearch("");
    setIsTyping(false);
  };

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
    if (!location.pathname.startsWith("/wines")) {
      resetSearch();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isTyping) return;
    if (search.trim() === "") return;

    const timeout = setTimeout(() => {
      navigate(`/wines?search=${encodeURIComponent(search.trim())}`);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, isTyping, navigate]);

  return (
    <>
      <Navbar expand="lg" className="wine-navbar py-3">
        <Container fluid className="px-5">
          <Navbar.Brand
            as={Link}
            to="/"
            className="wine-logo"
            onClick={resetSearch}>
            WineHub
          </Navbar.Brand>

          <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <Form.Control
                  placeholder="Descrivi cosa stai cercando"
                  className="search-input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsTyping(true);
                  }}
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

            <Link to="/profile" className="nav-icon" onClick={resetSearch}>
              <Person size={26} />
            </Link>

            <Link
              to="/cart"
              className="nav-icon position-relative"
              onClick={resetSearch}>
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
            <Nav.Link
              as={Link}
              to="/wines?category=WHITE"
              onClick={resetSearch}>
              Bianchi
            </Nav.Link>

            <Nav.Link as={Link} to="/wines?category=RED" onClick={resetSearch}>
              Rossi
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/wines?category=SPARKLING"
              onClick={resetSearch}>
              Spumanti
            </Nav.Link>

            <Nav.Link as={Link} to="/wines?category=ROSE" onClick={resetSearch}>
              Rose
            </Nav.Link>

            <Nav.Link as={Link} to="/wines" onClick={resetSearch}>
              Tutti i vini
            </Nav.Link>

            {user && (
              <>
                <Nav.Link as={Link} to="/favorites" onClick={resetSearch}>
                  Preferiti
                </Nav.Link>

                <Nav.Link as={Link} to="/orders" onClick={resetSearch}>
                  Ordini
                </Nav.Link>
              </>
            )}

            {(user?.role === "SELLER" || user?.role === "ADMIN") && (
              <Nav.Link as={Link} to="/my-wines" onClick={resetSearch}>
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
