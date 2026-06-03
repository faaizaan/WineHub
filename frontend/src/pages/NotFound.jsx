import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="not-found-title">404</h1>

      <p className="lead">Pagina non trovata</p>

      <Button as={Link} to="/" className="winehub-btn">
        Torna alla Home
      </Button>
    </Container>
  );
}

export default NotFound;
