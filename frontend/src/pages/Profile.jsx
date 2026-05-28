import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { becomeSeller, fetchMe } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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
    navigate("/login");
  };
  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h1>Profilo</h1>

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
          <div className="mt-3">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
