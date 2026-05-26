import { useEffect, useState } from "react";
import { fetchWines, fetchWinesByCategory } from "../services/api";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Wines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");

  const loadWines = async () => {
    const data = await fetchWines();

    if (data) {
      setWines(data.content);
    } else {
      setError("Errore nel caricamento dei vini");
    }
  };

  useEffect(() => {
    loadWines();
  }, []);

  const handleCategoryChange = async (category) => {
    setError("");

    let data;

    if (category === "") {
      data = await fetchWines();
    } else {
      data = await fetchWinesByCategory(category);
    }

    if (data) {
      setWines(data.content);
    } else {
      setError("Errore nel caricamento dei vini");
    }
  };

  return (
    <Container className="mt-4">
      <h1>Vini</h1>

      <Form.Select
        className="mb-4"
        onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Tutti</option>
        <option value="RED">Rossi</option>
        <option value="WHITE">Bianchi</option>
        <option value="ROSE">Rosé</option>
        <option value="SPARKLING">Spumanti</option>
      </Form.Select>

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
