import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1>404</h1>
      <p>Pagina non trovata</p>

      <Button as={Link} to="/" variant="dark">
        Torna alla Home
      </Button>
    </Container>
  );
}

export default NotFound;
