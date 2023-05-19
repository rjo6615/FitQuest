import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function Home() {
  return (
    <center>
    <div className="w-100">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100" style={{ maxHeight: 600, objectFit: "cover" }}
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
          className="d-block w-100" style={{ maxHeight: 600, objectFit: "cover" }}
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
          className="d-block w-100" style={{ maxHeight: 600, objectFit: "cover" }}
          src="./images/gym.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <br></br>
    {/* Introduction Card */}
    <div>
    <Col>
    <div className="card mb-3" style={{ maxWidth: 840 }}>
  <div className="row no-gutters">
    <div className="">
      <div className="card-body">
        <h4 className="card-title">Our Goal</h4>
        <p className="card-text">Here at Fit Quest our goal is to offer users a way to gauge the timeframe that it will take to meet their weight goals.
        We also offer to our users a nutrition calculator to make it easier to figure out your calorie intake and stay on track for your goals!</p>
        <p className="card-text"><small class="text-muted"></small></p>
      </div>
    </div>
  </div>
</div>
</Col>
    </div>
    {/* Create routine button */}
    <div>
    <Button href="./create-routine" className="p-4 m-1" size="lg" variant="primary">Start your Quest</Button>
    </div>
    </center>
  );
}

export default Home;