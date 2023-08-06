import { useState, useEffect } from 'react';

const RandomImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group the images into sets of 4
  const groupedImages = [];
  const chunkSize = 4;
  for (let i = 0; i < images.length; i += chunkSize) {
    groupedImages.push(images.slice(i, i + chunkSize));
  }

  return (
    <div className='carousel-container'>
      <div id="randomImageCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {groupedImages.map((imageGroup, groupIndex) => (
            <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
              <div className="row">
                {imageGroup.map((imageItem, index) => (
                  <div key={index} className="col-md-3">
                    <img src={imageItem.image} className="d-block w-100" alt={`Slide ${groupIndex}-${index}`} />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{imageItem.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="prev" key="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#randomImageCarousel" data-bs-slide="next" key="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default RandomImageCarousel;
