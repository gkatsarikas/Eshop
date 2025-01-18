import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios"; // Import axios for HTTP requests

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer"); // Default to 'Customer'
  const [error, setError] = useState<string | null>(null);

  const getAdminToken = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8182/realms/master/protocol/openid-connect/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'admin-cli',
          client_secret: 'szSUscZ3G0yZ6ha9I9WoS9PcxFmpWT5C', // Replace with your actual client secret
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      return response.data.access_token; // Return the token
    } catch (err) {
      console.error("Failed to obtain admin token:", err);
      throw new Error("Could not obtain admin token.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Get the admin token
      const token = await getAdminToken();

      // Step 2: Prepare user data for registration
      const userData = {
        email: email,
        enabled: true,
        username: username,
        attributes: {
          client_id: "eshop-frontend",
        },
        groups: [role==="Customer" ? "Customers" : "Sellers"], // Set role based on the selected option
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      };

      // Step 3: Register the user in Keycloak using the obtained token
      const response = await axios.post(
        "http://localhost:8182/admin/realms/Eshop/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the admin Bearer token
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User registered:", response.data);

      // Step 4: Redirect to the login page upon successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Register</h1>

      <Form onSubmit={handleRegister} className="w-100" style={{ maxWidth: "400px" }}>
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

        {/* Email Input */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Role Selection */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
          </Form.Select>
        </Form.Group>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>

      {/* Link to Login */}
      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <Button variant="link" onClick={() => navigate("/login")} className="p-0">
            Login here
          </Button>
        </p>
      </div>
    </Container>
  );
}
