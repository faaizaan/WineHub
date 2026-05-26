import { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { fetchMyOrders } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchMyOrders();

      if (data) {
        setOrders(data.content);
      } else {
        setError("Errore nel caricamento degli ordini");
      }
    };

    loadOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h1>I miei ordini</h1>

      {error && <p className="text-danger">{error}</p>}

      {orders.length === 0 && !error && (
        <p>Non hai ancora effettuato ordini.</p>
      )}

      {orders.map((order) => (
        <Card className="mb-3" key={order.id}>
          <Card.Header>Ordine del {order.orderDate}</Card.Header>

          <Card.Body>
            <p>
              Utente: <strong>{order.username}</strong>
            </p>

            <ListGroup>
              {order.items.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.wineName}</strong>
                      <p className="mb-0">Quantità: {item.quantity}</p>
                      <p className="mb-0">
                        Prezzo al momento dell'acquisto: {item.priceAtPurchase}{" "}
                        €
                      </p>
                    </div>

                    {item.wineImageUrl && (
                      <img
                        src={item.wineImageUrl}
                        alt={item.wineName}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Orders;
