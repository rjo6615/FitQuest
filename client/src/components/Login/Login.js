import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState({
    username: "", 
    password: "",
  });
  const [newUser, setNewUser] = useState({
    username: "", 
    password: "",
   });

  // Update the state properties.
  function updateForm(value) {
    return setNewUser((prev) => {
      return { ...prev, ...value };    
    });  
  }

  // Function to handle submission.
 async function onSubmit(e) {
  e.preventDefault();   
   sendToDb();
}

 // Sends form data to database
 async function sendToDb(){
  const newUserInfo = { ...newUser };
    await fetch("/users/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newUserInfo),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setNewUser({
   username: "", 
   password: "",});
 }
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
    console.log(message);
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
     <Form  className="w-25 pt-5 mb-3" onSubmit={handleSubmit}>
        <h1 className='text-dark'>Welcome to Fit-Quest please login</h1>
     <Form.Group className="" controlId="formUsername">
       <Form.Label>Username</Form.Label>
       <Form.Control type="text"  onChange={e => setUserName(e.target.value)} placeholder="Enter username" />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
     </Form.Group>
     <Button className="me-2" variant="primary" type="submit">
       Login
     </Button>
     <Button variant="success" onClick={() => {handleShow();}}>Sign up</Button>
   </Form>
   <MDBFooter bgColor='light' className='bg-image text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        </div>

        <div>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Fit Quest Company
              </h6>
              <p>
              Allow us to help you on your fitness journey by giving you workouts based on your goals. Sign up today free of charge to give it a try!
              </p>
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon fab icon="github" className="me-2" />
                <a href= "https://github.com/rjo6615">rjo6615</a>
              </p>
              <p>
                <MDBIcon fab icon="github" className="me-2" />
                <a href= "https://github.com/johnboy514">johnboy514</a>
              </p>
              <p>
                <MDBIcon fab icon="github" className="me-2" /> 
                <a href= "https://github.com/rjo6615/Fit-Quest">Fit Quest</a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://github.com/rjo6615'>
        If u steal code from this and don't credit us I'll ugly cry :C
        </a>
      </div>
    </MDBFooter> 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
      <Form onSubmit={onSubmit} className="px-5">
     
     <Form.Group className="mb-3 pt-3" controlId="formExerciseName">
       <Form.Label className="text-dark">Username</Form.Label>
       <Form.Control onChange={(e) => updateForm({ username: e.target.value })}
        type="text" placeholder="Enter username" />  
      
       <Form.Label className="text-dark">Password</Form.Label>
       <Form.Control onChange={(e) => updateForm({ password: e.target.value })} 
       type="password" placeholder="Enter password" />   
     </Form.Group>
     <center>
     <Button variant="primary" onClick={handleClose} type="submit">
            Submit
          </Button>
          <Button className="ms-4" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </center>
     </Form>
     </Modal.Body>        
      </Modal> 
   </center>
      
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};