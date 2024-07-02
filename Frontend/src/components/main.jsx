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
              src="./assets/main.png.jpg"
              alt="First slide"
              height={500}
            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">
              <div>
                <h3 className="fs-1 text fw-lighter">New Season Arrivals</h3>
                <p className="fs-5 d-none d-sm-block">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/main.png.jpg"
              alt="Second slide"
              height={500}
            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">
              <div>
                <h3 className="fs-1 text fw-lighter">Another Arrival</h3>
                <p className="fs-5 d-none d-sm-block">
                  Here's some more supporting text for the second slide.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/main.png.jpg"
              alt="Third slide"
              height={500}
            />
            <Carousel.Caption className="d-flex align-items-center justify-content-center">
              <div>
                <h3 className="fs-1 text fw-lighter">Yet Another Arrival</h3>
                <p className="fs-5 d-none d-sm-block">
                  And here's the supporting text for the third slide.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
