import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchMyFavorites } from "../services/api";
import { deleteFavorite } from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await fetchMyFavorites();

      if (data) {
        setFavorites(data.content);
      } else {
        setError("Errore nel caricamento dei preferiti");
      }
    };

    loadFavorites();
  }, []);

  return (
    <Container className="mt-4 mb-5">
      <h1 className="page-title">I miei preferiti</h1>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {favorites.map((favorite) => (
          <Col xs={12} md={6} xl={4} className="mb-3" key={favorite.favoriteId}>
            <Card className="wine-card-premium h-100">
              <Card.Img variant="top" src={favorite.imageUrl} />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{favorite.wineName}</Card.Title>

                <p className="fw-bold fs-5">{favorite.price} €</p>

                <button
                  className="btn btn-outline-danger mt-auto"
                  onClick={async () => {
                    const ok = await deleteFavorite(favorite.favoriteId);

                    if (ok) {
                      setFavorites(
                        favorites.filter(
                          (f) => f.favoriteId !== favorite.favoriteId,
                        ),
                      );
                    }
                  }}>
                  Rimuovi
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
