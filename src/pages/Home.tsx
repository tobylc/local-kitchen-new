import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedChefs from '../components/FeaturedChefs';

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedChefs />
    </div>
  );
};

export default Home;