import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { becomeSeller, fetchMe } from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    const data = await fetchMe();

    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleBecomeSeller = async () => {
    const result = await becomeSeller();

    if (result) {
      setMessage("Ora sei un seller!");
      setUser(result);
    } else {
      setMessage("Errore durante il cambio ruolo");
    }
  };

  if (!user) {
    return (
      <Container className="mt-4">
        <p>Caricamento profilo...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h1>Profilo</h1>

      {message && <p>{message}</p>}

      <Card>
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Nome:</strong> {user.nome}
          </p>

          <p>
            <strong>Cognome:</strong> {user.cognome}
          </p>

          <p>
            <strong>Ruolo:</strong> {user.role}
          </p>

          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.username}
              style={{ width: "120px", borderRadius: "50%" }}
            />
          )}

          {user.role === "USER" && (
            <div className="mt-3">
              <Button variant="warning" onClick={handleBecomeSeller}>
                Diventa seller
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
