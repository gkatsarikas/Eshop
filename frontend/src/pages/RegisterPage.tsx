import React,{useState} from "react";
import {Form,Button,Container,Alert} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState("Customer"); //Set default role to customer
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  const master_url = import.meta.env.VITE_KEYCLOAK_MASTER_URL;
  const client_id = import.meta.env.VITE_KEYCLOAK_MASTER_REALM_CLIENT_ID;
  const admin_cli_secret = import.meta.env.VITE_KEYCLOAK_ADMIN_CLIENT_SECRET;


  const register_url = import.meta.env.VITE_KEYCLOAK_REGISTER_URL;

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);

  
    try {
  
      //Obtain access token from admin client
      const adminTokenResponse = await fetch(
        master_url,
        {
          method: 'POST',
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: client_id,
            client_secret: admin_cli_secret,
          }).toString(),
        } 
      );

      if(!adminTokenResponse.ok){
        throw new Error("Failed to fetch access token from admin client");
      }

      const {access_token: adminToken} = await adminTokenResponse.json();


      //Register user
      const registerResponse = await fetch(
        register_url,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            enabled: true,
            attributes: {
              client_id: import.meta.env.VITE_CLIENT_ID,
            },
            groups: [role],
            credentials: [
              {
                type: "password",
                value: password,
                temporary: false,
              },
            ],
          }),
        }
      );

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData?.errorMessage || "Failed to register user");
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("Customer");

    } catch (err: any) {
      setError(err.message || "An error occured during registration");
    }
  }

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
            Login
          </Button>
        </p>
      </div>
    </Container>
  );
}

export default RegisterPage