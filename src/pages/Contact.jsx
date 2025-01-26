import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const ContactInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.h3`
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  color: var(--gray);
  line-height: 1.6;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--dark);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--dark);
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--light-gray);
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: var(--success-light);
  color: var(--success);
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Container>
      <Header>
        <Title>Contact Us</Title>
        <Subtitle>
          Have a question or feedback? We'd love to hear from you.
        </Subtitle>
      </Header>

      <Grid>
        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoItem>
            <Label>Address</Label>
            <Text>123 Spice Street, Flavor City, FC 12345</Text>
          </InfoItem>
          <InfoItem>
            <Label>Email</Label>
            <Text>info@spicehaven.com</Text>
          </InfoItem>
          <InfoItem>
            <Label>Phone</Label>
            <Text>+1 (555) 123-4567</Text>
          </InfoItem>
          <InfoItem>
            <Label>Business Hours</Label>
            <Text>Monday - Friday: 9:00 AM - 6:00 PM</Text>
            <Text>Saturday: 10:00 AM - 4:00 PM</Text>
            <Text>Sunday: Closed</Text>
          </InfoItem>
        </ContactInfo>

        <Form onSubmit={handleSubmit}>
          <FormTitle>Send us a Message</FormTitle>
          {isSubmitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you soon.
            </SuccessMessage>
          )}
          <InputGroup>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Button type="submit">Send Message</Button>
        </Form>
      </Grid>
    </Container>
  );
}

export default Contact; 