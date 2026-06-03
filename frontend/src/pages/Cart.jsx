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
    <Container className="mt-4 mb-5">
      <h1 className="page-title">Carrello</h1>

      {cart.length === 0 && <p>Il carrello è vuoto.</p>}

      {cart.map((item) => (
        <Card className="cart-card mb-3 p-2" key={item.wineId}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{item.wineName}</h5>

              <div className="d-flex align-items-center gap-2 mb-2">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => updateQuantity(item.wineId, -1)}>
                  -
                </button>

                <span className="fw-bold">{item.quantity}</span>

                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => updateQuantity(item.wineId, 1)}>
                  +
                </button>
              </div>

              <p className="mb-0">Prezzo: {item.price} €</p>
            </div>

            <img className="cart-img" src={item.imageUrl} alt={item.wineName} />
          </Card.Body>
        </Card>
      ))}

      {cart.length > 0 && (
        <div className="cart-card p-4 mt-4">
          <h3 className="cart-total">Totale: {total.toFixed(2)} €</h3>

          <Button className="winehub-btn mt-2" onClick={handleCreateOrder}>
            Conferma ordine
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Cart;
