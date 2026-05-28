import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { createOrder } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const updateQuantity = (wineId, amount) => {
    const updatedCart = cart
      .map((item) => {
        if (item.wineId === wineId) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCreateOrder = async () => {
    const order = {
      items: cart.map((item) => ({
        wineId: item.wineId,
        quantity: item.quantity,
      })),
    };

    const result = await createOrder(order);

    if (result) {
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Ordine creato correttamente");
      navigate("/orders");
    } else {
      toast.error("Errore durante la creazione dell'ordine");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h1>Carrello</h1>

      {cart.length === 0 && <p>Il carrello è vuoto.</p>}

      {cart.map((item) => (
        <Card className="mb-3" key={item.wineId}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.wineName}</h5>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => updateQuantity(item.wineId, -1)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => updateQuantity(item.wineId, 1)}>
                  +
                </button>
              </div>

              <p>Prezzo: {item.price} €</p>
            </div>

            <img
              src={item.imageUrl}
              alt={item.wineName}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </Card.Body>
        </Card>
      ))}

      {cart.length > 0 && (
        <>
          <h3 className="mt-4">Totale: {total.toFixed(2)} €</h3>

          <Button variant="success" onClick={handleCreateOrder}>
            Conferma ordine
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
