import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../contexts/AuthContext'
import Login from "../login/LoginPage";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, changePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match')
    }

    const promises =[]
    setLoading(true);
    setError('');
    setMessage('')
    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
        promises.push(changePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
        alert('Updated Successfully!')
        navigate('/')
    }).catch(() => {
        setError('Failed to update account')
    }).finally(() => {
        setLoading(false)
    })
  }

  return (
    <>
      <Container className="pt-4 d-flex justify-content-center flex-nowrap" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 h3">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                </Form.Group>
                <Form.Group id="password" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-4">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">Already have an account? <Link to="/" className="d-inline">Cancel</Link></div>
        </div>
      </Container>
    </>
  );
};
