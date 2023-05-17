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
// let calculation = "";
let maintainCalc = "";
// let intakeOffset= "";
// let activityOffset= "";

// if (form.workoutDifficulty === "Low") {
//   activityOffset = 250;
// }

// if (form.workoutDifficulty === "Moderate") {
//   activityOffset = 700;
// }

// if (form.workoutDifficulty === "Intense") {
//   activityOffset = 1150;
// }

// if (form.goal === "Slim") {
//   intakeOffset = -500;
// }

// if (form.goal === "Maintain") {
//   intakeOffset = 0;
// }

// if (form.goal === "Bulk") {
//   intakeOffset = 1400;
// }
// Calculator to get to target weight by time
let toTargetDays = Math.round(Math.abs(form.targetWeight - form.currentWeight) * 3500 / Math.abs(form.calorieIntake));

if (form.sex === "Male") {
  let convertWeight = form.currentWeight * .453592;
  let convertHeight = form.height * 2.54;
  // calculation = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) + 5 + intakeOffset + activityOffset);
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) + 5);
}
if (form.sex === "Female") {
  let convertWeight = form.currentWeight * .453592;
  let convertHeight = form.height * 2.54;
  // calculation = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) - 161 + intakeOffset + activityOffset);
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * form.age) -161);
} 

useEffect(() => {
  // updateForm({ calorieIntake: calculation }); 
  updateForm({ calorieMaintain: maintainCalc }); 
  updateForm({ daysToTarget: toTargetDays }); 
}, [maintainCalc, toTargetDays]);

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
   daysToTarget: "",});
   navigate("/showRoutines");
 }

 return (
<center>
      <h1 className="text-light">Create Routine</h1>
      <br></br>
    <Form onSubmit={onSubmit} className="px-5" style={{ marginBottom: 200, maxWidth: 600, minHeight: 315, borderRadius: 25}}>
     
      <Form.Group className="mb-3 pt-3" controlId="formExerciseName">
        <Form.Label className="text-light">Routine Name</Form.Label>
        <Form.Control onChange={(e) => updateForm({ routineName: e.target.value })}
         type="text" placeholder="Enter routine name" />  
       
        <Form.Label className="text-light">Age</Form.Label>
        <Form.Control onChange={(e) => updateForm({ age: e.target.value })} 
        type="text" placeholder="Enter age" /> 
        
        <Form.Label className="text-light">Sex</Form.Label>
        <Form.Select onChange={(e) => updateForm({ sex: e.target.value })}  type="text">
          <option></option>
          <option>Male</option>
          <option>Female</option>
        </Form.Select>

        <Form.Label className="text-light">Height</Form.Label>
        <Form.Control onChange={(e) => updateForm({ height: e.target.value })} 
        type="text" placeholder="Enter height" />      

        <Form.Label className="text-light">Current Weight(lbs)</Form.Label>
        <Form.Control onChange={(e) => updateForm({ currentWeight: e.target.value })} 
        type="text" placeholder="Enter current weight" />    

        <Form.Label className="text-light">Target Weight(lbs)</Form.Label>
        <Form.Control onChange={(e) => updateForm({ targetWeight: e.target.value })} 
        type="text" placeholder="Enter target weight" />  

        <Form.Label className="text-light">Goal</Form.Label>
        <Form.Select onChange={(e) => updateForm({ goal: e.target.value })} type="text">
          <option></option>
          <option>Bulk</option>
          <option>Maintain</option>
          <option>Slim</option>
        </Form.Select>    

        <Form.Label className="text-light">Workout Difficulty</Form.Label>
        <Form.Select onChange={(e) => updateForm({ workoutDifficulty: e.target.value })} type="text">
          <option></option>
          <option value="Low">Daily exercise, or intense exercise 3-4 times per week</option>
          <option value="Moderate">Intense exercise 6-7 times per week</option>
          <option value="Intense">Very intense exercise daily, or a highly physical job</option>
        </Form.Select>  
        
        <Form.Label className="text-light">Calorie Intake</Form.Label>
        <CDBContainer>
          <CDBSlider step={100} value={value} onChange={changeEvent => { setValue(changeEvent.target.value); updateForm({ calorieIntake: changeEvent.target.value })}} tooltip={"auto"} tooltipPlacement={"bottom"} size={"lg"} min={-1200} max={6000} style={{ width: '100%' }} />
        </CDBContainer> 
    
      </Form.Group>

      <Button className="mb-3" variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
    
    </center>
 );
}