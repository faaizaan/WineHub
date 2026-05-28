import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { fetchWineById } from "../services/api";
import { addFavorite } from "../services/api";
import { toast } from "react-toastify";

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
      toast.success("Vino aggiunto ai preferiti");
    } else {
      toast("già aggiunto ai preferiti");
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingWine = cart.find((item) => item.wineId === wine.id);

    if (existingWine) {
      existingWine.quantity += 1;
    } else {
      cart.push({
        wineId: wine.id,
        wineName: wine.name,
        imageUrl: wine.imageUrl,
        price: wine.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Vino aggiunto al carrello");
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
          <button className="btn btn-success ms-2" onClick={handleAddToCart}>
            Aggiungi al carrello
          </button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WineDetails;
