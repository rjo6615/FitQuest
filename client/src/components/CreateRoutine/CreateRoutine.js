import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CDBSlider, CDBContainer } from 'cdbreact';

export default function RoutineForm() {
 // Global Variables
 const [ value, setValue ] = useState(0); 
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
  token: "",
});

 const navigate = useNavigate();

 // Update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };    
    });  
  }

 // Function to handle submission.
 async function onSubmit(e) {
  e.preventDefault();   
   sendToDb();
}
// Big Maffs
let maintainCalc = "";
let yourGoal = "";
let sliderMin = "";
let sliderMax = "";
let sliderValue = "";

if (form.goal === "Slim") {
  sliderMin = -1200;
  sliderMax = -100;
  sliderValue = value;
}

if (form.goal === "Maintain") {
  sliderValue = 0;
  sliderMin = 0;
  sliderMax = 0;
}

if (form.goal === "Bulk") {
  sliderMin = 100;
  sliderMax = 6000;
  sliderValue = value;
}

if (form.currentWeight > form.targetWeight) {
  yourGoal = "Slim";
}

if (form.currentWeight === form.targetWeight) {
  yourGoal = "Maintain";
}

if (form.currentWeight < form.targetWeight) {
  yourGoal = "Bulk";
}


// Calculator to get to target weight by time
let toTargetDays = Math.round(Math.abs(form.targetWeight - form.currentWeight) * 3500 / Math.abs(form.calorieIntake));

if (form.sex === "Male") {
  let convertWeight = form.currentWeight * .453592;
  let convertHeight = form.height * 2.54;
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) + 5);
}
if (form.sex === "Female") {
  let convertWeight = form.currentWeight * .453592;
  let convertHeight = form.height * 2.54;
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) -161);
} 

const items = JSON.parse(localStorage.getItem('token'));
console.log(items.token);
useEffect(() => {
  updateForm({ calorieMaintain: maintainCalc }); 
  updateForm({ daysToTarget: toTargetDays }); 
  updateForm({ goal: yourGoal }); 
  updateForm({ calorieIntake: sliderValue });
  updateForm({ token: items.token });
}, [maintainCalc, toTargetDays, yourGoal, sliderValue, items.token]);

 // Sends form data to database
 async function sendToDb(){
  console.log(form.routineName);
  const newRoutine = { ...form };
    await fetch("/routines/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newRoutine),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({
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
   token: "",});
   navigate(`/single-routine/${items.token}`);
 }

 return (
<center>
      <h1 className="text-dark" style={{fontFamily: "Shadows Into Light, cursive"}}>Start your Quest</h1>
      <br></br>
    <Form onSubmit={onSubmit} className="px-5" style={{ marginBottom: 200, maxWidth: 600, minHeight: 315, borderRadius: 25}}>
     
      <Form.Group className="mb-3 pt-3" controlId="formExerciseName">
        <Form.Label className="text-dark">Routine Name</Form.Label>
        <Form.Control onChange={(e) => updateForm({ routineName: e.target.value })}
         type="text" placeholder="Enter routine name" />  
       
        <Form.Label className="text-dark">Age</Form.Label>
        <Form.Control onChange={(e) => updateForm({ age: e.target.value })} 
        type="text" placeholder="Enter age" /> 
        
        <Form.Label className="text-dark">Sex</Form.Label>
        <Form.Select onChange={(e) => updateForm({ sex: e.target.value })}  type="text">
          <option></option>
          <option>Male</option>
          <option>Female</option>
        </Form.Select>

        <Form.Label className="text-dark">Height</Form.Label>
        <Form.Control onChange={(e) => updateForm({ height: e.target.value })} 
        type="text" placeholder="Enter height" />      

        <Form.Label className="text-dark">Current Weight(lbs)</Form.Label>
        <Form.Control onChange={(e) => updateForm({ currentWeight: e.target.value })} 
        type="text" placeholder="Enter current weight" />    

        <Form.Label className="text-dark">Target Weight(lbs)</Form.Label>
        <Form.Control onChange={(e) => updateForm({ targetWeight: e.target.value })} 
        type="text" placeholder="Enter target weight" />  

        <Form.Label className="text-dark">Workout Difficulty</Form.Label>
        <Form.Select onChange={(e) => updateForm({ workoutDifficulty: e.target.value })} type="text">
          <option></option>
          <option value="Low">Low difficulty exercise 3 days per week</option>
          <option value="Moderate">Moderate difficulty exercise 4 days per week</option>
          <option value="Intense">Intense difficulty exercise 5 days per week</option>
        </Form.Select>  
        
        <Form.Label className="text-dark">Calorie Intake</Form.Label>
        <CDBContainer>
          <CDBSlider step={100} value={value} onChange={changeEvent => { setValue(changeEvent.target.value); updateForm({ calorieIntake: changeEvent.target.value })}} tooltip={"auto"} tooltipPlacement={"bottom"} size={"lg"} min={sliderMin} max={sliderMax} style={{ width: '100%' }} />
        </CDBContainer> 
    
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    </center>
 );
}