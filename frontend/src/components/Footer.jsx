import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col md={4}>
            <h3 className="footer-logo">WineHub</h3>

            <p>
              Marketplace dedicato agli amanti del vino e ai seller
              indipendenti.
            </p>
          </Col>

          <Col md={4}>
            <h5>Link utili</h5>

            <div className="d-flex flex-column gap-2">
              <Link to="/" className="footer-link">
                Home
              </Link>

              <Link to="/wines" className="footer-link">
                Vini
              </Link>

              <Link to="/favorites" className="footer-link">
                Preferiti
              </Link>

              <Link to="/orders" className="footer-link">
                Ordini
              </Link>
            </div>
          </Col>

          <Col md={4}>
            <h5>Contatti</h5>

            <p>Email: winehub@gmail.com</p>
            <p>Telefono: +39 333 1234567</p>
          </Col>
        </Row>

        <div className="footer-bottom text-center py-3">
          © 2026 WineHub - All rights reserved
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
