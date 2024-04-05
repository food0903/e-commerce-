import React, { useState } from 'react';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => setShowToast(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
  
      handleShowToast();
  
      setTimeout(() => {
        setIsLoggedIn(true);
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      setError('Invalid username or password');
    }
  };


  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <h1 className="mb-4">Login</h1>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

        {/* Toast component */}
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Login Successful</strong>
          </Toast.Header>
          <Toast.Body>loading..</Toast.Body>
        </Toast>

      </Form>
    </Container>
  );
}

export default LoginPage;
