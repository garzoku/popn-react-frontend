import React, {useState}from "react";
import style from "./Homepage.module.css";
import { Anchor } from "react-bootstrap";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import Signup from "../signup/Signup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Homepage(){
const [error, setError] = useState("")
const {currentUser, logout} = useAuth()
const navigate = useNavigate()

  async function handleLogout(){
    setError('')

    try{

      await logout()
      navigate('/login')
    }catch{setError('Failed to Logout')}
  }
  return (
    <div className="pt-4">
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email:</strong> {currentUser.email}
        <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link>
      </Card.Body>
    <div className="w-100 text-center mt-2"><Button variant="link" onClick={handleLogout}>Log Out</Button></div>
    </Card>
    </div>
  );
};

