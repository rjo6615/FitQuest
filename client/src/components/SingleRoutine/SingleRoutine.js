import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
 
export default function SingleRoutine() {
 const [form, setForm] = useState({
  routineName: "", 
  age: "",
  sex: "",
  height: "",
  currentWeight: "",
  targetWeight: "",
  goal: "",
  workoutDifficulty: "",
  calorieIntake: "",
  calorieMaintain: "",
  daysToTarget: "",
 });
 
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`/routines/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
   fetchData();
   
   
   return;
   
 }, [params.id, navigate]);
 // This following section will display the workout data from the db.
 return (
  <center className="pb-4">
     <div className="">
     <h1 className="text-light">{form.routineName}</h1>
     <h2 className="text-light">Age: {form.age}</h2>
 <Col className="mx-5">          
 <Card>
   <Card.Body>
     <Card.Title>Suggested Calorie Intake: {form.calorieIntake}</Card.Title>
     <Card.Subtitle className="mb-2 text-muted">Days to Target Weight: {form.daysToTarget}</Card.Subtitle>
     <Card.Subtitle className="mb-2 text-muted">Calories to Maintain Weight: {form.calorieMaintain}</Card.Subtitle>
     <Card.Subtitle className="mb-2 text-muted">Target Weight: {form.targetWeight}</Card.Subtitle>
   </Card.Body>
 </Card>            
 </Col>
  </div>
</center>
);
}