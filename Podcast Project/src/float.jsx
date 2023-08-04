import React, { useState, useEffect } from 'react';

const RandomImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows') // Update the API URL here
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of objects with "image" and "title" keys
        const imageItems = data.map((item) => ({
          image: item.image,
          title: item.title,
        }));
        setImages(imageItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero-section">
      <div className="carousel-container">
        <div className="show-info">
          {images.map((imageItem, index) => (
            <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={imageItem.image} alt={`Slide ${index}`} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{imageItem.title}</h5>
              </div>
            </div>
          ))}
        </div>
        <div className="arrow-icon backward" onClick={handlePrevSlide}>
          &lt;
        </div>
        <div className="arrow-icon forward" onClick={handleNextSlide}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default RandomImageCarousel;
