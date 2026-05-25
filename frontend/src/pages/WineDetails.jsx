import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { fetchWineById } from "../services/api";
import { addFavorite } from "../services/api";

function WineDetails() {
  const { wineId } = useParams();
  const [wine, setWine] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWine = async () => {
      const data = await fetchWineById(wineId);

      if (data) {
        setWine(data);
      } else {
        setError("Errore nel caricamento del vino");
      }
    };

    loadWine();
  }, [wineId]);

  if (error) {
    return (
      <Container className="mt-4">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!wine) {
    return (
      <Container className="mt-4">
        <p>Caricamento...</p>
      </Container>
    );
  }

  const handleAddFavorite = async () => {
    const result = await addFavorite(wine.id);

    if (result) {
      alert("Vino aggiunto ai preferiti");
    } else {
      alert("Errore");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={wine.imageUrl} />
        <Card.Body>
          <Card.Title>{wine.name}</Card.Title>
          <Card.Text>{wine.description}</Card.Text>
          <p>{wine.price} €</p>
          <p>{wine.wineCategory}</p>
          <button className="btn btn-primary" onClick={handleAddFavorite}>
            Aggiungi ai preferiti
          </button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WineDetails;
