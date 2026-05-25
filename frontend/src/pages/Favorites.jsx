import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { addFavorite } from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await addFavorite();

      if (data) {
        setFavorites(data.content);
      } else {
        setError("Errore nel caricamento dei preferiti");
      }
    };

    loadFavorites();
  }, []);

  return (
    <Container className="mt-4">
      <h1>I miei preferiti</h1>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {favorites.map((favorite) => (
          <Col md={4} className="mb-3" key={favorite.favoriteId}>
            <Card className="h-100">
              <Card.Img variant="top" src={favorite.imageUrl} />

              <Card.Body>
                <Card.Title>{favorite.wineName}</Card.Title>
                <p>{favorite.price} €</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
