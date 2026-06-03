import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { becomeSeller, fetchMe } from "../services/api";
import { toast } from "react-toastify";
function Profile() {
  const [user, setUser] = useState(null);
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
      toast.success("Ora sei un seller!");
      setUser(result);
    } else {
      toast.error("Errore durante il cambio ruolo");
    }
  };

  if (!user) {
    return (
      <Container className="mt-4">
        <p>Caricamento profilo...</p>
      </Container>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: "650px" }}>
      <h1 className="page-title">Profilo</h1>

      <Card className="profile-card p-3">
        <Card.Body className="text-center">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.username}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          )}
          <Card.Title className="profile-name">{user.username}</Card.Title>

          <div className="profile-info">
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
          </div>

          {user.role === "USER" && (
            <div className="review-section">
              <h4>Vuoi vendere i tuoi vini su WineHub?</h4>
              <p>Diventa seller e inizia a creare il tuo catalogo.</p>

              <button className="btn winehub-btn" onClick={handleBecomeSeller}>
                Diventa seller
              </button>
            </div>
          )}

          {user.role === "SELLER" && (
            <div className="alert alert-success mt-4">
              Sei già un seller. Puoi gestire i tuoi vini dalla sezione “I miei
              vini”.
            </div>
          )}

          <div className="mt-4">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
