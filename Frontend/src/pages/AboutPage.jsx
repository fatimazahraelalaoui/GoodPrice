import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row mb-5">
          <div className="col text-center">
            <h1>About Us</h1>
            <hr className="mx-auto w-50" />
            <p className="lead">
              At GoodPrice, we believe that fashion is more than just clothing—it's an expression of who you are. We are passionate about providing our customers with high-quality, not expensive, stylish, and affordable clothing that makes you feel confident and look fabulous.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h2 className="card-title">Our Mission</h2>
                <hr />
                <p className="card-text lead">
                  Our mission is to bring the latest trends and timeless classics to your wardrobe. We carefully curate our collections to ensure that each piece reflects our commitment to quality, style, and sustainability. Whether you're looking for casual everyday wear, elegant evening attire, or something in between, we've got you covered.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h2 className="card-title">Our Vision</h2>
                <hr />
                <p className="card-text lead">
                  We envision a world where fashion is accessible to everyone, where everyone can express themselves through their clothing choices without compromising on quality or ethics. We aim to be a leader in the fashion industry by continuously innovating and adapting to the ever-changing landscape of style and sustainability.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h2 className="card-title">Why Choose Us?</h2>
                <hr />
                <ul className="list-unstyled lead">
                  <li>Quality: We source our materials from trusted suppliers to ensure that every item in our store meets our high standards of quality and durability.</li>
                  <li>Style: Our team of fashion experts is dedicated to bringing you the latest trends and timeless pieces that you'll love.</li>
                  <li>Sustainability: We are committed to ethical and sustainable practices, from sourcing materials to manufacturing processes.</li>
                  <li>Customer Service: Your satisfaction is our top priority. Our friendly and knowledgeable customer service team is always here to help.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage