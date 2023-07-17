// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import FetchApi from './FetchAPI';
// @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;600;700&display=swap'); 





import React, { useState, useEffect } from 'react';

// Define the App component
function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch the list of shows
  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.log('Error fetching shows:', error);
    }
  };

  // Fetch episodes for a selected season
  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason);
    }
  }, [selectedSeason]);

  const fetchEpisodes = async (seasonId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${seasonId}`);
      const data = await response.json();
      setEpisodes(data.episodes);
    } catch (error) {
      console.log('Error fetching episodes:', error);
    }
  };

  // Handle selecting a show
  const selectShow = (show) => {
    setSelectedShow(show);
    setSelectedSeason(null);
  };

  // Handle selecting a season
  const selectSeason = (season) => {
    setSelectedSeason(season.id);
  };

  // Handle marking an episode as favorite
  const markAsFavorite = (episode) => {
    setFavorites([...favorites, episode]);
  };

  // Handle removing an episode from favorites
  const removeFromFavorites = (episode) => {
    const updatedFavorites = favorites.filter((favEpisode) => favEpisode.id !== episode.id);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="img">
      {/* Render the list of shows */}
      {shows.map((show) => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <img src={show.image} alt={show.title} />
          {/* Add other show details */}
          <button onClick={() => selectShow(show)}>View Details</button>
        </div>
      ))}

      {/* Render the selected show details */}
      {selectedShow && (
        <div>
          <h2>{selectedShow.title}</h2>
          <img src={selectedShow.image} alt={selectedShow.title} />
          {/* Add other show details */}
          {/* Render the list of seasons */}
          {selectedShow.seasons.map((season) => (
            <div key={season.id}>
              <h3>{season.title}</h3>
              <img src={season.image} alt={season.title} />
              {/* Add other season details */}
              <button onClick={() => selectSeason(season)}>View Episodes</button>
            </div>
          ))}
        </div>
      )}

      {/* Render the selected season episodes */}
      {selectedSeason && (
        <div>
          <h3>Episodes</h3>
          {/* Render the list of episodes */}
          {episodes.map((episode) => (
            <div key={episode.id}>
              <h4>{episode.title}</h4>
              <img src={episode.image} alt={episode.title} />
              {/* Add other episode details */}
              <button onClick={() => markAsFavorite(episode)}>Add to Favorites</button>
            </div>
          ))}
        </div>
      )}

      {/* Render the list of favorite episodes */}
      <div>
        <h3>Favorites</h3>
        {/* Render the list of favorite episodes */}
        {favorites.map((episode) => (
          <div key={episode.id}>
            <h4>{episode.title}</h4>
            <img src={episode.image} alt={episode.title} />
            {/* Add other episode details */}
            <button onClick={() => removeFromFavorites(episode)}>Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

