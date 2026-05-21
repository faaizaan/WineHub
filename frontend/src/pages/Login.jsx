import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      alert("login completato");
      navigate("/wines");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2 className="text-center mt-5">Login</h2>
      <div style={{ maxWidth: "400px", margin: "50px auto" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
export default Login;
