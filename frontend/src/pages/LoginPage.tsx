import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utils"
import { useAuth } from "../hooks/AuthHook";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const {login} = useAuth();

  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError(null);
  
    const url = import.meta.env.VITE_KEYCLOAK_URL;
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          client_id: client_id,
          client_secret: client_secret,
          grant_type: "password",
        }).toString(),
      });
  
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
  
      const data = await response.json();
      const access_token = data.access_token;
      const refresh_token = data.refresh_token;
  
      // Decode and store token (optional)
      console.log("Access Token:", access_token);
      const decoded_at = decodeJwt(access_token);
      console.log("Decoded Access Token:", decoded_at);
  
      console.log("Refresh Token:", refresh_token);
      const decoded_rt = decodeJwt(refresh_token);
      console.log("Decoded Refresh Token:", decoded_rt);

      //Store both tokens at local storage 
      localStorage.setItem("access_token",access_token);
      localStorage.setItem("refresh_token",refresh_token);

      login(access_token, refresh_token);

      // Navigate to the home page or dashboard
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
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

      {/* Link to Login */}
      <div className="mt-3 text-center">
        <p>
          Do not have an account?{" "}
          <Button variant="link" onClick={() => navigate("/register")} className="p-0">
            Register
          </Button>
        </p>
      </div>
    </Container>
  );
};

export default LoginPage;
