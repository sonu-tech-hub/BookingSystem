
import React from "react";
import "../components/componentCss/hero1.css";
import photo from "../assets/hotels-booking.jpg"; 
const MarketingSection = () => {
    return (
      <section className="marketing-section py-24 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="marketing-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={photo} alt="Feature 1" className="w-full" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Exclusive Deals</h3>
              <p className="text-gray-700">
                Get access to exclusive property deals that you won’t find anywhere else.
              </p>
              <button className="btn-primary mt-4">Learn More</button>
            </div>
          </div>
  
          <div className="marketing-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={photo} alt="Feature 2" className="w-full" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Top-Notch Support</h3>
              <p className="text-gray-700">
                Our customer support team is here to help you at every step of the way.
              </p>
              <button className="btn-primary mt-4">Get Help</button>
            </div>
          </div>
  
          <div className="marketing-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={photo} alt="Feature 3" className="w-full" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Wide Selection</h3>
              <p className="text-gray-700">
                Choose from a wide range of properties that fit your needs and budget.
              </p>
              <button className="btn-primary mt-4">Explore Properties</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MarketingSection;  