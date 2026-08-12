import { useEffect, useState } from "react";
import {
  fetchWines,
  fetchWinesByCategory,
  fetchMe,
  deleteWine,
} from "../services/api";

import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCloudinaryImage } from "../services/utils";

function Wines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchFromUrl = searchParams.get("search") || "";

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        // Carica i vini
        const winesPromise =
          category === "" ? fetchWines() : fetchWinesByCategory(category);

        // Carica l'utente solo se esiste un token
        const token = localStorage.getItem("token");

        const userPromise = token ? fetchMe() : Promise.resolve(null);

        // Le due richieste partono contemporaneamente
        const [winesData, userData] = await Promise.all([
          winesPromise,
          userPromise,
        ]);

        // Gestione vini
        if (winesData) {
          setWines(winesData.content || []);
        } else {
          setWines([]);
          setError("Errore nel caricamento dei vini.");
        }

        // Gestione utente
        if (token) {
          if (userData) {
            setUser(userData);
          } else {
            localStorage.removeItem("token");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Errore caricamento:", err);
        setError("Impossibile caricare i vini. Riprova.");
        setWines([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  const handleAddToCart = (wine) => {
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

  const handleDelete = async (wineId) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questo vino?",
    );

    if (!confirmDelete) {
      return;
    }

    const ok = await deleteWine(wineId);

    if (ok) {
      setWines((currentWines) =>
        currentWines.filter((wine) => wine.id !== wineId),
      );

      toast.success("Vino eliminato");
    } else {
      toast.warning(
        "Non puoi eliminare questo vino perché è collegato a ordini o preferiti",
      );
    }
  };

  const filteredWines = wines.filter((wine) => {
    const searchLower = searchFromUrl.toLowerCase().trim();

    return (
      wine.name?.toLowerCase().includes(searchLower) ||
      wine.description?.toLowerCase().includes(searchLower)
    );
  });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}>
        <Spinner
          animation="border"
          role="status"
          style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>

        <h4 className="mt-4">Caricamento vini...</h4>

        <p className="text-muted">
          Il server potrebbe essere in avvio, attendi qualche secondo.
        </p>
      </Container>
    );
  }

  // =========================
  // PAGINA
  // =========================

  return (
    <Container className="mt-4">
      <h1>Vini</h1>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {!error && filteredWines.length === 0 && (
        <p className="text-muted mt-4">Nessun vino trovato.</p>
      )}

      <Row>
        {filteredWines.map((wine) => (
          <Col xs={12} md={6} xl={4} className="mb-3" key={wine.id}>
            <Card className="wine-card-premium h-100">
              <Card.Img
                loading="lazy"
                variant="top"
                src={getCloudinaryImage(wine.imageUrl, 600, 400)}
                alt={wine.name}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold fs-4 text-dark">
                  {wine.name}
                </Card.Title>

                <Card.Text className="text-muted flex-grow-1">
                  {wine.description}
                </Card.Text>

                <p className="fw-bold fs-5 mb-1">{wine.price} €</p>

                <p className="text-secondary mb-1">{wine.wineCategory}</p>

                <p className="small text-muted">
                  Venditore: {wine.sellerUsername}
                </p>

                <div className="d-flex flex-column gap-2 mt-auto">
                  <Link to={`/wines/${wine.id}`} className="btn winehub-btn">
                    Dettagli
                  </Link>

                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(wine)}>
                    Aggiungi al carrello
                  </Button>

                  {user?.role === "ADMIN" && (
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(wine.id)}>
                      Elimina
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wines;
