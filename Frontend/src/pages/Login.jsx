import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // safety: prevent empty submit
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("token/", {
        username: username.trim(),
        password: password.trim(),
      });

      // store token
      localStorage.setItem("accessToken", response.data.access);

      // redirect to expenses
      window.location.href = "/";
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page flex-center">
      <section className="section section--tight">
        <div className="container">
          <div className="card">
            <h2>Login</h2>

            {error && <p className="text-error">{error}</p>}

            <form className="grid" onSubmit={handleSubmit}>
              <div>
                <label className="text-muted">Username</label>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border"
                  required
                />
              </div>

              <div>
                <label className="text-muted">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border"
                  required
                />
              </div>

              <button className="btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
