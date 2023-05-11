import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

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
    <Row xs={1} md={2} lg={2} xl={2} className="g-4 mx-4">
    <Col>
    <div className="card mb-3" style={{ maxWidth: 840 }}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://trifitnessbox.com/wp-content/uploads/2018/02/182699.jpg" className="card-img" alt="profile pic"/> 
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h4 className="card-title">{form.routineName}</h4>
        <h6 className="card-title">Age: {form.age}</h6>
        <h6 className="card-title">Sex: {form.sex}</h6>
        <h6 className="card-title">Current Weight: {form.currentWeight}</h6>
        <h6 className="card-title">Target Weight: {form.targetWeight}</h6>
        <h6 className="card-title">Goal: {form.goal}</h6>
        <h6 className="card-title">Workout Difficulty: {form.workoutDifficulty}</h6>
        <p className="card-text"></p>
        <p className="card-text"><small class="text-muted"></small></p>
      </div>
    </div>
  </div>
</div>
</Col>
<Col>
    <div className="card mb-3" style={{ maxWidth: 840 }}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://theakshayapatrafoundation.files.wordpress.com/2016/02/healthy-food.jpg" class="card-img" alt="nutrition"/> 
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h4 className="card-title">Nutrition</h4>
        <h5 className="card-title">Days until target is reached: {form.daysToTarget}</h5>
        <h6 className="card-title">We reccomend a daily intake of <strong>{form.calorieIntake}</strong> per day to reach your goal.</h6>
        <h6 className="card-title">Your current calorie intake to maintain your weight not including excercise would be <strong>{form.calorieMaintain}</strong> per day to reach your goal.</h6>
        <p className="card-text"></p>
        <Button variant="primary">Your Personal Nutrition</Button>
        <p className="card-text"><small class="text-muted"></small></p>
      </div>
    </div>
  </div>
</div>
</Col>
</Row>
     <div className="">          
 <div className="container">
 <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-4">
 {routine.map((el) => (   
  <Col>
 <Card className="mt-4" style={{ width: '18rem' }}>
 <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg?crop=0.668xw:1.00xh;0.260xw,0&resize=1200:*" />
 <Card.Body>
   <Card.Title>{el.name}</Card.Title>
   <Card.Text>
   {el.volume}
   </Card.Text>
   <Button variant="primary">More Information</Button>
 </Card.Body>
</Card>
</Col>
  ))}
</Row>
</div>
</div>
</center>
);
}