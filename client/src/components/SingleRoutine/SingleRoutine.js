import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

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
 const [modalData, setModalData] = useState([]);
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 
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
      const date = new Date();
      const day = date.getDay();  
      console.log(day);    
      // very angry big errors but work afterwords
      const response = await fetch(`/routines/goal/${form.goal.toString()}/${form.workoutDifficulty.toString()}/${day}`);
  
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
    {/* Profile Card */}
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
        <h6 className="card-title">Height: {form.height} Inches</h6>
        <h6 className="card-title">Sex: {form.sex}</h6>
        <h6 className="card-title">Current Weight: {form.currentWeight} Pounds</h6>
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
{/* Nutrition Card */}
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
        <a className="text-light text-decoration-none" href="/nutrition"><Button variant="primary">Your Personal Nutrition</Button></a>
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
 {/* Cards for the different exercises */}
 {routine.map((el) => (   
  <Col>
 <Card className="mt-4" style={{ width: '18rem' }}>
 <Card.Img variant="top" src={el.image} />
 <Card.Body>
   <Card.Title>{el.name}</Card.Title>
   <Card.Text>
   {el.volume} Hour(s)
   </Card.Text>
   <Card.Text>
    Calories Burned: <strong>{Math.round(el.activityCoefficient * (form.currentWeight * 0.4535937) * el.volume)}</strong>
   </Card.Text>
   <Button variant="secondary" onClick={() => {handleShow(); setModalData(el);}}>More Information</Button>
 </Card.Body>
</Card>
</Col>
  ))}
</Row>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalData.info}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</div>
</div>
</center>
);
}