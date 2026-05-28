import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:1312/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || "Errore durante il login");
      }

      const { accessToken } = data;

      localStorage.setItem("token", accessToken);

      toast.success("login completato");
      navigate("/wines");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Bentornato</h2>
        <p className="auth-subtitle">Accedi al tuo account WineHub</p>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
          <p className="text-center mt-4">
            Non sei ancora registrato?
            <span
              className="auth-link"
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}>
              Registrati
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
