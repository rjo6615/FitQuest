import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
// import { useNavigate } from "react-router";

async function loginUser(credentials) {
 return fetch('/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState({
    username: "", 
    password: "",
  });
  // const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    checkUser();
}

async function checkUser() {
if (username === user.username && password === user.password) {
  const token = await loginUser({
    username,
    password
  });
  setToken(token);
} else {
alert('Failed to log in');
}
}

useEffect(() => {
async function fetchData() {
  const response = await fetch(`/users/${username}/${password}`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const record = await response.json();
  if (!record) {
    return;
  }
  setUser(record);
}
fetchData();
return;
}, [username, password]); 

  return(
    <center  className="bg-image">
         <div className="w-50">
    <Carousel className='pt-5'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/arm_row.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Start your fitness journey today!</h3>
          <p>Allow us to help you to reach your goals.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/cardio.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Keep on the move!</h3>
          <p>Remember only the weak ignore leg day.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/gym.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
     <Form  className="w-25 pt-5" onSubmit={handleSubmit}>
        <h1 className='text-dark'>Welcome to Fit-Quest please login</h1>
     <Form.Group className="mb-3" controlId="formUsername">
       <Form.Label>Username</Form.Label>
       <Form.Control type="text"  onChange={e => setUserName(e.target.value)} placeholder="Enter username" />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
     </Form.Group>
     <Button variant="secondary" type="submit">
       Submit
     </Button>
   </Form>

  
   </center>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};