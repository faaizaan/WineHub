import { useEffect, useState } from "react";
import { fetchWines, fetchWinesByCategory } from "../services/api";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Wines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWines = async () => {
    setLoading(true);

    try {
      const data = await fetchWines();

      if (data) {
        setWines(data.content);
      } else {
        setError("Errore nel caricamento dei vini");
      }
    } catch (error) {
      setError("Errore nel caricamento dei vini");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWines();
  }, []);

  const handleCategoryChange = async (category) => {
    setError("");
    setLoading(true);

    try {
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
    } catch (error) {
      setError("Errore nel caricamento dei vini");
    } finally {
      setLoading(false);
    }
  };

  const filteredWines = wines.filter((wine) =>
    wine.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <Container className="mt-4">
        <h3>Caricamento vini...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Vini</h1>

      <Form.Control
        type="text"
        placeholder="Cerca vino..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      {filteredWines.length === 0 && !error && <p>Nessun vino trovato.</p>}

      <Row>
        {filteredWines.map((wine) => (
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
