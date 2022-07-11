import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import {useAuth} from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import Signup from "../signup/Signup";
import ForgotPassword from "../forgot-password/ForgotPassword";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logInWithEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    
    try {
      setError('')
      setLoading(true)
      await logInWithEmail(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to log in')
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="pt-4 d-flex justify-content-center flex-nowrap" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 h3">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3 d-flex justify-content-center"><Link to="/forgot-password" element={<ForgotPassword />}>Forgot Password?</Link></div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2 d-inline-block">Need an account? <Link to="/signup" className="d-inline" element={<Signup />}>Sign Up</Link></div>
        </div>
      </Container>
    </>
  );
};