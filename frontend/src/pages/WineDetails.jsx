import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import {
  fetchWineById,
  addFavorite,
  fetchRewiews,
  createRewiew,
  deleteRewiew,
  fetchMe,
} from "../services/api";
import { toast } from "react-toastify";
import { getCloudinaryImage } from "../services/utils";

function WineDetails() {
  const { wineId } = useParams();

  const [wine, setWine] = useState(null);
  const [error, setError] = useState("");
  const [rewiews, setRewiews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadWine = async () => {
      const data = await fetchWineById(wineId);

      if (data) {
        setWine(data);
      } else {
        setError("Errore nel caricamento del vino");
      }
    };

    const loadRewiews = async () => {
      const data = await fetchRewiews(wineId);
      setRewiews(data);
    };

    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const data = await fetchMe();
        setCurrentUser(data);
      }
    };

    loadWine();
    loadRewiews();
    loadUser();
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
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Effettua il login per aggiungere ai preferiti");
      return;
    }

    const result = await addFavorite(wine.id);

    if (result) {
      toast.success("Vino aggiunto ai preferiti");
    } else {
      toast("Già aggiunto ai preferiti");
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Effettua il login per aggiungere al carrello");
      return;
    }

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

  const handleCreateRewiew = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Effettua il login per lasciare una recensione");
      return;
    }

    const newRewiew = {
      rating: Number(rating),
      comment,
    };

    const result = await createRewiew(wineId, newRewiew);

    if (result) {
      setRewiews([...rewiews, result]);
      setComment("");
      setRating(5);
      toast.success("Recensione aggiunta");
    } else {
      toast.error("Hai già recensito questo vino o errore recensione");
    }
  };

  const handleDeleteRewiew = async (rewiewId) => {
    const ok = await deleteRewiew(rewiewId);

    if (ok) {
      setRewiews(rewiews.filter((rewiew) => rewiew.reviewId !== rewiewId));
      toast.success("Recensione eliminata");
    } else {
      toast.error("Errore eliminazione recensione");
    }
  };

  const averageRating =
    rewiews.length > 0
      ? rewiews.reduce((acc, rewiew) => acc + rewiew.rating, 0) / rewiews.length
      : 0;

  return (
    <Container className="mt-4 mb-5">
      <Card className="wine-card-premium">
        <img
          className="wine-detail-img"
          src={getCloudinaryImage(wine.imageUrl, 1000, 700)}
          alt={wine.name}
        />

        <Card.Body className="p-4">
          <Card.Title className="profile-name">{wine.name}</Card.Title>
          <Card.Text className="lead">{wine.description}</Card.Text>

          <p className="fs-5 fw-bold">{wine.price} €</p>
          <p className="text-muted">{wine.wineCategory}</p>

          <div className="d-flex flex-column flex-md-row gap-2">
            <button className="btn winehub-btn" onClick={handleAddFavorite}>
              Aggiungi ai preferiti
            </button>

            <button className="btn btn-success" onClick={handleAddToCart}>
              Aggiungi al carrello
            </button>
          </div>

          <div className="review-section">
            <h5>⭐ {averageRating.toFixed(1)} / 5</h5>
            <p className="text-muted">{rewiews.length} recensioni</p>

            <h4>Recensioni</h4>

            {rewiews.length === 0 && <p>Nessuna recensione ancora.</p>}

            {rewiews.map((rewiew) => (
              <div key={rewiew.reviewId} className="review-box p-3 mb-3">
                <strong>{rewiew.username}</strong>
                <p className="mb-1">{"⭐".repeat(rewiew.rating)}</p>
                <p>{rewiew.comment}</p>

                {currentUser?.username === rewiew.username && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteRewiew(rewiew.reviewId)}>
                    Elimina recensione
                  </button>
                )}
              </div>
            ))}

            <h5 className="mt-4">Lascia una recensione</h5>

            <form onSubmit={handleCreateRewiew}>
              <select
                className="form-select mb-2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}>
                <option value="1">1 stella</option>
                <option value="2">2 stelle</option>
                <option value="3">3 stelle</option>
                <option value="4">4 stelle</option>
                <option value="5">5 stelle</option>
              </select>

              <textarea
                className="form-control mb-2"
                placeholder="Scrivi una recensione..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button className="btn winehub-btn" type="submit">
                Invia recensione
              </button>
            </form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WineDetails;
