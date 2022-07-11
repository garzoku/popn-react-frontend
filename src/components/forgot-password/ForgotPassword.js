import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import {useAuth} from '../../contexts/AuthContext'
import { Link} from "react-router-dom";
import Signup from "../signup/Signup";
import Login from "../login/LoginPage";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword} = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault();
    
    try {
        setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="pt-4 d-flex justify-content-center flex-nowrap" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 h3">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3 d-flex justify-content-center"><Link to="/login" element={<Login />}>Log In</Link></div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2 d-inline-block">Need an account? <Link to="/signup" element={<Signup />} className="d-inline">Sign Up</Link></div>
        </div>
      </Container>
    </>
  );
};