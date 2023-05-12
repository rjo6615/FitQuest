import React, { useState } from "react";
import { useRef } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function Nutrition() {
 const [form, setForm] = useState([]);

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
   API();
 }

//API call
 let options = {
  method: 'GET',
  headers: { 'x-api-key': 'UJmqxvFPZX01XFomvmpcvw==Wl0sl0iTW5S1MUpN' }
}
let mealArr = [];

const meal = useRef();

 async function API() { 
  const search = meal.current.value;
let url = 'https://api.api-ninjas.com/v1/nutrition?query=' + search;
 await fetch(url,options)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          mealArr = data;
          return;
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
        setForm(mealArr);
        console.log(form);
        return;        
    }
 return (
<center>
<Col>
    <div className="card mb-3" style={{ maxWidth: 840 }}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://theakshayapatrafoundation.files.wordpress.com/2016/02/healthy-food.jpg" className="card-img" alt="nutrition"/> 
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h2 className="card-title">Nutrition</h2>
        <h5 className="card-title">Use our nutrition lookup to search for the nutritional value of your favorite meals!</h5>
        <p className="card-text">Be very specific with your search. i.e. 1 serving of chicken marsala</p>
        <div className="input-group">
            <input type="text" ref={meal} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" className="btn btn-outline-primary" onClick={onSubmit}>search</button>
        </div>
      </div> 
    </div>
  </div>
</div>
</Col>
<div className="container">
 <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-4">
 {form.map((el) => (   
  <Col>
 <Card className="mt-4" style={{ width: '18rem' }}>
 <Card.Body>
   <Card.Title>{el.name.toUpperCase()}</Card.Title>
   <Card.Text>
   Calories: {el.calories}
   <br/>
   Serving Size (g): {el.serving_size_g}
   <br/>
   Total Fat (g): {el.fat_total_g}
   <br/>
   Saturated Fat (g): {el.fat_saturated_g}
   <br/>
   Protien (g): {el.protein_g}
   <br/>
   Sodium (mg): {el.sodium_mg}
   <br/>
   Potassium (mg): {el.potassium_mg}
   <br/>
   Cholesterol (mg): {el.cholesterol_mg}
   <br/>
   Total Carbohydrates (g): {el.carbohydrates_total_g}
   <br/>
   Fiber (g): {el.fiber_g}
   <br/>
   Sugar (g): {el.sugar_g}
   </Card.Text>
 </Card.Body>
</Card>
</Col>
  ))}
</Row>
</div>    
</center>
 );
}

export default Nutrition;