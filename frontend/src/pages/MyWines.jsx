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
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>I miei vini</h1>

        <Link to="/create-wine" className="btn btn-success">
          + Crea vino
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {wines.map((wine) => (
          <Col md={4} className="mb-3" key={wine.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={wine.imageUrl} />

              <Card.Body>
                <Card.Title>{wine.name}</Card.Title>
                <Card.Text>{wine.description}</Card.Text>
                <p>{wine.price} €</p>
                <p>{wine.wineCategory}</p>

                <Button variant="danger" onClick={() => handleDelete(wine.id)}>
                  Elimina
                </Button>
                <Link
                  to={`/edit-wine/${wine.id}`}
                  className="btn btn-primary me-2">
                  Modifica
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyWines;
