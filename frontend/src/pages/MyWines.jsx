import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { fetchMyWines, deleteWine } from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MyWines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWines = async () => {
      const data = await fetchMyWines();

      if (data) {
        setWines(data.content);
      } else {
        setError("Errore nel caricamento dei tuoi vini");
      }
    };

    loadWines();
  }, []);

  const handleDelete = async (wineId) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questo vino?",
    );

    if (!confirmDelete) {
      return;
    }
    const ok = await deleteWine(wineId);

    if (ok) {
      setWines(wines.filter((wine) => wine.id !== wineId));
      toast.success("Vino eliminato");
    } else {
      toast.warning(
        "Non puoi eliminare questo vino perché è collegato a ordini o preferiti",
      );
    }
  };
  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">I miei vini</h1>

        <Link to="/create-wine" className="btn winehub-btn">
          + Crea vino
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {wines.map((wine) => (
          <Col xs={12} md={6} xl={4} className="mb-3" key={wine.id}>
            <Card className="wine-card-premium h-100">
              <Card.Img variant="top" src={wine.imageUrl} />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{wine.name}</Card.Title>

                <Card.Text className="text-muted flex-grow-1">
                  {wine.description}
                </Card.Text>

                <p className="fw-bold">{wine.price} €</p>

                <p>{wine.wineCategory}</p>

                <div className="d-flex flex-column gap-2 mt-auto">
                  <Link
                    to={`/edit-wine/${wine.id}`}
                    className="btn winehub-btn">
                    Modifica
                  </Link>

                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(wine.id)}>
                    Elimina
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyWines;
