import React from 'react';
import './Pages.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="about-section">
        <h1>Our Story</h1>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Spice Haven, your premier destination for artisanal spices and hot sauces. 
              Our journey began in 2015 with a simple mission: to bring the world's finest spices 
              and most flavorful hot sauces to passionate food lovers everywhere.
            </p>
            <p>
              What started as a small family business has grown into a beloved destination for 
              spice enthusiasts and culinary adventurers. We source our products directly from 
              farmers and artisans around the globe, ensuring the highest quality and most 
              authentic flavors.
            </p>
          </div>
          <div className="about-image">
            <img src="/images/about/store-front.jpg" alt="Spice Haven Store Front" />
          </div>
        </div>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <div className="mission-card">
            <h3>Quality</h3>
            <p>
              We are committed to sourcing only the finest ingredients and products. 
              Every item in our collection is carefully selected for its quality, 
              authenticity, and flavor profile.
            </p>
          </div>
          <div className="mission-card">
            <h3>Sustainability</h3>
            <p>
              We work directly with farmers who practice sustainable agriculture and 
              fair trade principles. Our packaging is eco-friendly, and we strive to 
              minimize our environmental impact.
            </p>
          </div>
          <div className="mission-card">
            <h3>Education</h3>
            <p>
              We believe in sharing knowledge about spices and hot sauces. Through 
              our blog, workshops, and in-store events, we help our customers 
              discover new flavors and cooking techniques.
            </p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/images/team/founder.jpg" alt="Sarah Johnson - Founder" />
            <h3>Sarah Johnson</h3>
            <p>Founder & Spice Expert</p>
          </div>
          <div className="team-member">
            <img src="/images/team/chef.jpg" alt="Michael Chen - Head Chef" />
            <h3>Michael Chen</h3>
            <p>Head Chef & Product Developer</p>
          </div>
          <div className="team-member">
            <img src="/images/team/sourcing.jpg" alt="Maria Rodriguez - Sourcing Manager" />
            <h3>Maria Rodriguez</h3>
            <p>Sourcing Manager</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Visit Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Store Location</h3>
            <p>123 Spice Street</p>
            <p>Flavor Town, ST 12345</p>
            <h3>Hours</h3>
            <p>Monday - Friday: 9am - 8pm</p>
            <p>Saturday: 10am - 6pm</p>
            <p>Sunday: 11am - 5pm</p>
            <h3>Contact</h3>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@spicehaven.com</p>
          </div>
          <div className="map">
            {/* Add your map component or iframe here */}
            <div className="map-placeholder">
              Map will be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 