import React from 'react';

const Hero = () => {
  const scrollToMarketplace = (e) => {
    e.preventDefault();
    const section = document.getElementById('marketplace');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Fresh Produce Direct from Local Farmers</h1>
        <p>Support local agriculture while enjoying the freshest organic products delivered to your doorstep. No middlemen, better prices.</p>
        <button className="btn" onClick={scrollToMarketplace}>
          Shop Fresh Produce
        </button>
      </div>
    </section>
  );
};

export default Hero;