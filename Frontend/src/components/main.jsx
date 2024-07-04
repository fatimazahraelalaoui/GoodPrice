import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/slide_22.jpg"
              alt="First slide"

            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/slide_2.jpg"
              alt="Second slide"

            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">
              <div>
                <h3 className="fs-1 text fw-lighter">New arrival</h3>

              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/slide_3.jpg"
              alt="Third slide"

            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">
              <div>
                <h3 className="fs-1 text fw-lighter">discount 50% 30% 70%</h3>

              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
