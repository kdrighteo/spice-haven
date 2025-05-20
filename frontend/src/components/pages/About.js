import React from 'react';
import './About.css';

const teamMembers = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    bio: 'Passionate about bringing the finest spices to your kitchen.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Quality',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    bio: 'Ensuring the highest quality standards for all our products.'
  },
  {
    name: 'Michael Chen',
    role: 'Master Blender',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    bio: 'Creating unique spice blends that elevate your cooking.'
  }
];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Spice Haven</h1>
        <p>Your trusted source for premium spices and herbs since 2010</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Spice Haven was founded with a simple mission: to bring the world's finest spices
            directly to your kitchen. We believe that quality spices are the foundation of
            great cooking, and we're committed to sourcing only the best ingredients from
            around the globe.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Commitment</h2>
          <div className="commitment-grid">
            <div className="commitment-item">
              <h3>Quality</h3>
              <p>We carefully select and test every spice to ensure the highest quality.</p>
            </div>
            <div className="commitment-item">
              <h3>Sustainability</h3>
              <p>We work with farmers who practice sustainable agriculture.</p>
            </div>
            <div className="commitment-item">
              <h3>Authenticity</h3>
              <p>We maintain traditional methods of processing and preserving spices.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 