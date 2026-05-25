import { useEffect, useState } from "react";
import { fetchWines } from "../services/api";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Wines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWines = async () => {
      const data = await fetchWines();
      console.log("RISPOSTA VINI:", data);
      if (data) {
        setWines(data.content);
      } else {
        setError("Errore nel caricamento dei vini");
      }
    };

    loadWines();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Vini</h1>

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
                <p>{wine.sellerUsername}</p>
                <Link to={`/wines/${wine.id}`} className="btn btn-primary">
                  Dettagli
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wines;
