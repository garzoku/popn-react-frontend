import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../contexts/AuthContext'
import Login from "../login/LoginPage";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUpWithEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signUpWithEmail(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="pt-4 d-flex justify-content-center flex-nowrap" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 h3">Sign Up</h2>
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
                <Form.Group id="password-confirm" className="mb-4">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">Already have an account? <Link to="/login" className="d-inline" element={<Login />}>Log In</Link></div>
        </div>
      </Container>
    </>
  );
};
