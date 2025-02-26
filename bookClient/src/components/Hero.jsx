import React from "react";
import "../components/componentCss/hero1.css"; // Import your CSS file
import photo from "../assets/hotels-booking.jpg"; // Import your data
const HeroSection = () => {
  return (
    <section className="hero-section bg-black opacity-90">
      <div className="hero-content">
        <h1 className="text-green-900">Unlock Your Dream Home Today</h1>
        <p>
          Explore the best properties in town with unbeatable prices and deals.
        </p>
        <button className="btn-primary">Get Started</button>
        <div className="scroll-down">
          <span>Scroll Down</span>
        </div>
      </div>

      {/* <div className="video-boxes mt-4">
                <div className="video-container rounded-sm">
                    <video width="300" height="300" autoPlay loop muted>
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="video-container smaller-video">
                    <video width="200" height="200" autoPlay loop muted>
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div> */}

      <div className="image-scroll-wrapper">
        <div className="image-scroll-container ">
          <div className="scroll-image  ">
            <img src={photo} alt="Property 2" />
            <div className="tagline">Beautiful Home</div>
          </div>
          <div className="scroll-image h-10">
            <img src={photo} alt="Property 2" />
            <div className="tagline">Modern Design</div>
          </div>
          <div className="scroll-image h-10">
            <img src={photo} alt="Property 3" />
            <div className="tagline">Luxury Living</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
