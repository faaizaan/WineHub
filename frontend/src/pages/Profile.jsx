import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { becomeSeller } from "../services/api";

function Profile() {
  const [message, setMessage] = useState("");

  const handleBecomeSeller = async () => {
    const result = await becomeSeller();

    if (result) {
      setMessage("Ora sei un seller!");
    } else {
      setMessage("Errore durante il cambio ruolo");
    }
  };

  return (
    <Container className="mt-4">
      <h1>Profilo</h1>

      {message && <p>{message}</p>}

      <Button variant="warning" onClick={handleBecomeSeller}>
        Diventa seller
      </Button>
    </Container>
  );
}

export default Profile;
