import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
  };

  if (showProducts) {
    return <ProductList onHomeClick={() => { setShowProducts(false); setShowAboutUs(false); }} />;
  }

  if (showAboutUs) {
    return <AboutUs />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;