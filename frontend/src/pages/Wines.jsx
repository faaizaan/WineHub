import { useEffect, useState } from "react";
import { fetchWines, fetchWinesByCategory } from "../services/api";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function Wines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchFromUrl = searchParams.get("search") || "";

  useEffect(() => {
    const loadWines = async () => {
      setLoading(true);
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

      setLoading(false);
    };

    loadWines();
  }, [category]);

  const handleAddToCart = (wine) => {
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

  const filteredWines = wines.filter((wine) => {
    const searchLower = searchFromUrl.toLowerCase();

    return (
      wine.name.toLowerCase().includes(searchLower) ||
      wine.description.toLowerCase().includes(searchLower)
    );
  });

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

                <div className="d-flex flex-column flex-md-row gap-2">
                  <Link to={`/wines/${wine.id}`} className="btn btn-primary">
                    Dettagli
                  </Link>

                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(wine)}>
                    Aggiungi al carrello
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

export default Wines;
