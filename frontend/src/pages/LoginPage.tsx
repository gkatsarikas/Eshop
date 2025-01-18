import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios"; // Import axios if you use it

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Set up the data for the Keycloak token request
      const requestData = new URLSearchParams();
      requestData.append("username", username);
      requestData.append("password", password);
      requestData.append("client_id", "eshop-frontend");
      requestData.append("client_secret", "hkx7HYPColqJbycJfSspg7OtMWxGTjNQ");
      requestData.append("grant_type", "password");

      // Make the HTTP request to the Keycloak token endpoint
      const response = await axios.post(
        "http://localhost:8182/realms/Eshop/protocol/openid-connect/token",
        requestData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // If successful, store the token (e.g., in localStorage or state) and navigate
      const { access_token } = response.data;
      console.log("Login successful:", access_token);

      // Save token if needed, e.g., localStorage.setItem('access_token', access_token);

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your username and password.");
    }
  };

  const redirectToRegister = () => {
    // Navigate to the registration page
    navigate("/register");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Login</h1>

      <Form onSubmit={handleLogin} className="w-100" style={{ maxWidth: "400px" }}>
        {/* Username Input */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>

      {/* Register Redirect */}
      <div className="mt-3 text-center">
        <p>
          Don't have an account?{" "}
          <Button variant="link" onClick={redirectToRegister} className="p-0">
            Register here
          </Button>
        </p>
      </div>
    </Container>
  );
}
