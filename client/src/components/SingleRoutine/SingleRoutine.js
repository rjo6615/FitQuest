import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
 
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

 const [routine, setRoutine] = useState([]);
 
 const params = useParams();
 const navigate = useNavigate();
 
 //Fetches original routine data
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


  //Fetches routine goal data
  useEffect(() => {
    async function fetchStuff() {
      console.log(form.goal);
      const goal = form.goal.toString();
      // very angry big errors but work afterwords
      const response = await fetch(`/routines/goal/${form.goal.toString()}/${form.workoutDifficulty.toString()}`);
  
      // if (!response.ok) {
      //   const message = `An error has occurred: ${response.statusText}`;
      //   window.alert(message);
      //   return;
      // }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with goal ${goal} not found`);
        navigate("/");
        return;
      }
  console.log(form.goal);
      setRoutine(record);
    }
    fetchStuff();
    return;
    
  }, [form, routine.length, navigate]);
  

  
 // This following section will display the workout data from the db.
 return (
  <center className="pb-4">
     <div className="">
     <h1 className="text-light">{form.routineName}</h1>
     <h2 className="text-light">Age: {form.age}</h2>
     {routine.map((el) => (   
 <Col className="mx-5">          
 <Card> 
   <Card.Body>
     <Card.Title>Suggested Calorie Intake: {form.calorieIntake}</Card.Title>
     <Card.Subtitle className="mb-2 text-muted">Days to Target Weight: {form.daysToTarget}</Card.Subtitle>
     <Card.Subtitle className="mb-2 text-muted">Calories to Maintain Weight: {form.calorieMaintain}</Card.Subtitle>
     <Card.Subtitle className="mb-2 text-muted">Target Weight: {form.targetWeight}</Card.Subtitle>     
     <Card.Subtitle className="mb-2 text-muted">Workout Name: {el.name}</Card.Subtitle>
     <Card.Subtitle className="mb-2 text-muted">Workout Volume: {el.volume}</Card.Subtitle>    
   </Card.Body>
 </Card>            
 </Col>
  ))}
  </div>
</center>
);
}