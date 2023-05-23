import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CDBSlider, CDBContainer } from 'cdbreact';

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
 const [ value, setValue ] = useState(0); 
 const [updatedForm, setUpdateForm] = useState({
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

 const [totalCal, setTotalCal] = useState([]);
 const [routine, setRoutine] = useState([]);
 const [modalData, setModalData] = useState([]);
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const [show1, setShow1] = useState(false);
 const handleClose1 = () => setShow1(false);
 const handleShow1 = () => setShow1(true);
 
//  const params = useParams();
 const navigate = useNavigate();

  // Update the state properties.
  function updateForm(value) {
    return setUpdateForm((prev) => {
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

if (updatedForm.goal === "Slim") {
  sliderMin = -1200;
  sliderMax = -100;
  sliderValue = value;
}

if (updatedForm.goal === "Maintain") {
  sliderValue = 0;
  sliderMin = 0;
  sliderMax = 0;
}

if (updatedForm.goal === "Bulk") {
  sliderMin = 100;
  sliderMax = 6000;
  sliderValue = value;
}

if (updatedForm.currentWeight > updatedForm.targetWeight) {
  yourGoal = "Slim";
}

if (updatedForm.currentWeight === updatedForm.targetWeight) {
  yourGoal = "Maintain";
}

if (updatedForm.currentWeight < updatedForm.targetWeight) {
  yourGoal = "Bulk";
}


// Calculator to get to target weight by time
let toTargetDays = Math.round(Math.abs(updatedForm.targetWeight - updatedForm.currentWeight) * 3500 / Math.abs(updatedForm.calorieIntake));

if (updatedForm.sex === "Male") {
  let convertWeight = updatedForm.currentWeight * .453592;
  let convertHeight = updatedForm.height * 2.54;
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * updatedForm.age) + 5);
}
if (updatedForm.sex === "Female") {
  let convertWeight = updatedForm.currentWeight * .453592;
  let convertHeight = updatedForm.height * 2.54;
  maintainCalc = Math.round((10 * convertWeight) + (6.25 * convertHeight) - (5 * updatedForm.age) -161);
} 

useEffect(() => {
  updateForm({ calorieMaintain: maintainCalc }); 
  updateForm({ daysToTarget: toTargetDays }); 
  updateForm({ goal: yourGoal }); 
  updateForm({ calorieIntake: sliderValue });
}, [maintainCalc, toTargetDays, yourGoal, sliderValue]);

const items = JSON.parse(localStorage.getItem('token'));
 // Sends form data to database
 async function sendToDb(){
  const updateRoutine = { ...updatedForm };
    await fetch(`/update/${items.token}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(updateRoutine),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setUpdateForm({
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
   navigate(0);
 }
//  const [items, setItems] = useState([]);

//  useEffect(() => {
//    const items = JSON.parse(localStorage.getItem('token'));
//    console.log(items.token);
//    if (items) {
//     setItems(items);
//    }
//  }, []);
 //Fetches original routine data
 useEffect(() => {
   async function fetchData() {
    //  const id = params.id.toString();
    const items = JSON.parse(localStorage.getItem('token'));
     const response = await fetch(`/routines/${items.token}`);
     
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
      //  window.alert(`Record not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
   fetchData();   
   return;
   
 }, [navigate]);


  //Fetches routine goal data
  useEffect(() => {
    async function fetchStuff() {
      const goal = form.goal.toString();
      const date = new Date();
      const day = date.getDay();    
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
      setRoutine(record);
    }
    fetchStuff();
    return;
    
  }, [form, routine.length, navigate]);
  
useEffect(() => {
let totalCal = 0;  
routine.map((el) => (
  totalCal = totalCal + Math.round(el.activityCoefficient * (form.currentWeight * 0.4535937) * el.time/60)
  ));
  setTotalCal(totalCal);
}, [form, routine]);
 

 // This following section will display the workout data from the db.
 return (
  
  <center className="pb-4">
    <Row xs={1} md={2} lg={2} xl={2} className="g-4 mx-4">
    {/* Profile Card */}
    <Col>
    <div className="card mb-3" style={{ maxWidth: 840, minHeight: 310 }}>
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
        <Button variant="primary" onClick={() => {handleShow1();}}>Edit</Button>
        <p className="card-text"><small class="text-muted"></small></p>
      </div>
    </div>
  </div>
</div>
</Col>
<Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
      <Form onSubmit={onSubmit} className="px-5">
     
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
         <option value="Low">Daily exercise, or intense exercise 3-4 times per week</option>
         <option value="Moderate">Intense exercise 6-7 times per week</option>
         <option value="Intense">Very intense exercise daily, or a highly physical job</option>
       </Form.Select>  
       
       <Form.Label className="text-dark">Calorie Intake</Form.Label>
       <CDBContainer>
         <CDBSlider step={100} value={value} onChange={changeEvent => { setValue(changeEvent.target.value); updateForm({ calorieIntake: changeEvent.target.value })}} tooltip={"auto"} tooltipPlacement={"bottom"} size={"lg"} min={sliderMin} max={sliderMax} style={{ width: '100%' }} />
       </CDBContainer> 
   
     </Form.Group>
     <center>
     <Button variant="primary" onClick={handleClose1} type="submit">
            Save
          </Button>
          <Button className="ms-4" variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          </center>
     </Form>
     </Modal.Body>        
      </Modal>
{/* Nutrition Card */}
<Col>
    <div className="card mb-3" style={{ maxWidth: 840, minHeight: 310 }}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://theakshayapatrafoundation.files.wordpress.com/2016/02/healthy-food.jpg" class="card-img" alt="nutrition"/> 
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h4 className="card-title">Nutrition</h4>
        <h5 className="card-title">Days until target is reached: {form.daysToTarget}</h5>
        <h6 className="card-title">We reccomend a daily intake of <strong>{Number(form.calorieMaintain) + (Number(form.calorieIntake) + totalCal)}</strong> per day to reach your goal.</h6>
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
   {el.time} Minutes
   </Card.Text> 
    <Card.Text>
   {el.volume} 
   </Card.Text>
   <Card.Text>
    Calories Burned: <strong>{Math.round(el.activityCoefficient * (form.currentWeight * 0.4535937) * el.time/60)}</strong>
   </Card.Text>
   <Button variant="secondary" onClick={() => {handleShow(); setModalData(el);}}>More Information</Button>
 </Card.Body>
</Card>
</Col>
  ))}
</Row>
<Button variant="success" className="mt-4">Total Calories: {totalCal}</Button>
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