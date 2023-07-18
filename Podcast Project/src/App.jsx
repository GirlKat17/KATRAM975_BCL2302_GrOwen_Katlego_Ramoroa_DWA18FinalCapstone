// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import FetchApi from './FetchAPI';
// @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;600;700&display=swap'); 







import React, { useState, useEffect } from 'react';


const PodcastApp = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      setShows(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const fetchShowDetails = async (showId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      setSelectedShow(data);
      setSelectedSeason(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const handleShowClick = (showId) => {
    fetchShowDetails(showId);
  };

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedShow) {
    return (
      <div className="container">
        <h1>Podcast App</h1>
        <ul className="cards">
          {shows.map((show) => (
            <li className="card" key={show.id} onClick={() => handleShowClick(show.id)}>
              <div className="image">
                <img src={show.previewImage} alt={show.title} />
                <div className="dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="infos">
                <span className="name">{show.title}</span>
                <span className="lorem">{show.seasons.length} Seasons</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => setSelectedShow(null)}>Back to Show List</button>
      <h2>{selectedShow.title}</h2>
      {selectedShow.seasons.map((season) => (
        <div key={season.number}>
          <h3>Season {season.number}</h3>
          {selectedSeason === season.number ? (
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.id}>{episode.title}</li>
              ))}
            </ul>
          ) : (
            <div>
              <img src={season.previewImage} alt={`Season ${season.number}`} />
              <div>{season.episodes.length} Episodes</div>
              <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PodcastApp;

