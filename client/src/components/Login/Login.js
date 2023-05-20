import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Carousel from 'react-bootstrap/Carousel';
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
    confirmPassword: "",
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
  if (newUser.password === newUser.confirmPassword) {
    sendToDb();
  } else {
    alert("Passwords do not match!");
  }
   
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
   password: "",
   confirmPassword: "",});
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
    <center>
       <MDBContainer className="my-5">
<MDBRow>
  <MDBCol col='6' className="mb-5">
    <div className="d-flex flex-column ms-5">
      <div className="text-center">
        <img src="./images/android-chrome-192x192.png"
          style={{width: '185px'}} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1" style={{fontFamily: "Shadows Into Light, cursive"}}><strong>Fit Quest</strong></h4>
      </div>
      <p>Please login to your account</p>
      <Form  className="w-100 mb-3" onSubmit={handleSubmit}>
     <Form.Group className="" controlId="formUsername">
       <Form.Label>Username</Form.Label>
       <Form.Control type="text"  onChange={e => setUserName(e.target.value)} placeholder="Enter username" />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
     </Form.Group>     
      <div className="text-center pt-1 mb-5 pb-1">
      <Button className="mb-2 w-100" variant="primary" type="submit">
       Login
     </Button>
        <a className="text-muted" href="#!">Forgot password?</a>
      </div>
      </Form>
      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p className="mb-0">Don't have an account?</p>
        <Button variant="success" className="mx-2" onClick={() => {handleShow();}}>Sign up</Button>
      </div>
    </div>
  </MDBCol>
  <MDBCol col='6' className="mb-5">
    <div className="d-flex flex-column bg-image justify-content-center h-100 mb-4" style={{backgroundImage: 'url(./images/loginbg.jpg)', objectFit: "contain"}}>
      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
        <h4 class="mb-4">We are more than just a company</h4>
        <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  </MDBCol>
</MDBRow>
</MDBContainer>
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

       <Form.Label className="text-dark">Confirm Password</Form.Label>
       <Form.Control onChange={(e) => updateForm({ confirmPassword: e.target.value })} 
       type="password" placeholder="Confirm password" />  
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