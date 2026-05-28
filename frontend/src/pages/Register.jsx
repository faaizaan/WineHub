import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:1312/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          nome,
          cognome,
          email,
          password,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.message || "Errore durante la registrazione");
      }

      toast.success("registrazione completata");

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <h2 className="auth-title">Crea account</h2>

        <p className="auth-subtitle">Entra nella community WineHub</p>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Username</label>

            <input
              className="form-control auth-input"
              type="text"
              placeholder="Scegli uno username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-3">
            <div className="w-50">
              <label className="form-label">Nome</label>

              <input
                className="form-control auth-input"
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="w-50">
              <label className="form-label">Cognome</label>

              <input
                className="form-control auth-input"
                type="text"
                placeholder="Cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Email</label>

            <input
              className="form-control auth-input"
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>

            <input
              className="form-control auth-input"
              type="password"
              placeholder="Crea una password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Registrati
          </button>
          <p className="text-center mt-4">
            sei gia registrato?
            <span
              className="auth-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
