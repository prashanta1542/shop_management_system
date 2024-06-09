import React, { useState } from 'react';
import '../css/background.css';

const images = [
    { id: 1, url: 'https://icms-image.slatic.net/images/ims-web/f841a43d-0c6d-44cd-b4ad-b20f9288d72d.jpg' },
    { id: 2, url: 'https://icms-image.slatic.net/images/ims-web/18b51cc9-346b-41ee-8c0a-09f135d8d6d3.jpg' },
    { id: 3, url: 'https://icms-image.slatic.net/images/ims-web/084f46a8-831f-4fab-8c0b-879b2fcd3ddc.jpg' },
  ];
  

const Background = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`carousel__item ${
            index === currentIndex ? 'carousel__item--active' : ''
          }`}
          style={{ backgroundImage: `url(${image.url})` }}
        ></div>
      ))}
      <button className="carousel__button carousel__button--prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel__button carousel__button--next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Background;
