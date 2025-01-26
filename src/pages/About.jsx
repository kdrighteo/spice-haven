import React from 'react';
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

const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

function About() {
  return (
    <Container>
      <Header>
        <Title>About Spice Haven</Title>
        <Subtitle>
          Bringing the finest spices from around the world to your kitchen
        </Subtitle>
      </Header>

      <Grid>
        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <Text>
            Founded in 2024, Spice Haven began with a simple mission: to bring the
            world's finest spices directly to cooking enthusiasts. Our journey
            started with a passion for authentic flavors and a commitment to
            quality.
          </Text>
          <Text>
            Today, we source our spices from the most renowned spice-growing
            regions across the globe, ensuring that each product meets our
            stringent quality standards.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Our Promise</SectionTitle>
          <Text>
            We believe in providing only the freshest, highest-quality spices to
            our customers. Each spice is carefully selected, tested, and packaged
            to preserve its authentic flavor and aroma.
          </Text>
          <Text>
            Our commitment to sustainability means we work directly with farmers
            and use eco-friendly packaging whenever possible.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Quality Guarantee</SectionTitle>
          <Text>
            Every product in our collection undergoes rigorous quality testing to
            ensure it meets our high standards. We guarantee the freshness and
            authenticity of all our spices.
          </Text>
          <Text>
            If you're not completely satisfied with your purchase, we offer a
            hassle-free return policy and dedicated customer support.
          </Text>
        </Section>
      </Grid>
    </Container>
  );
}

export default About; 