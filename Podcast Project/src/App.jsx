import  { useState, useEffect } from 'react';
import Search from './Search';
import './app.css'

const PodcastApp = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filteredShows, setFilteredShows] = useState([]); // Add filteredShows state

  const genreTitleMapping = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    const updateFilteredShows = () => {
      let filteredShows = shows.filter((show) =>
        show.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (sortBy === 'title') {
        filteredShows.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'genre') {
        filteredShows.sort((a, b) => a.genre - b.genre);
      } else if (sortBy === 'date') {
        filteredShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
      }

      setFilteredShows(filteredShows);
    };

    updateFilteredShows();
  }, [shows, searchQuery, sortBy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedShow) {
    return (
      <div className="container">
        <div>
          <nav className="senka">
            <Search
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
            />
          </nav>
        </div>
        <h1>Podcast App</h1>
        <ul className="cards">
          {filteredShows.map((show) => ( // Use filteredShows here instead of shows
            <li className="card" key={show.id}>
              <div className="image-lay">
                <img src={show.image} alt={show.title} key={show.id} onClick={() => handleShowClick(show.id)} />
              </div>
              <div className="infos">
                <span className="name">{show.title}</span>
                <span className="pop">Seasons: {show.seasons}</span>
                <span>{show.genres.map((genreId) => genreTitleMapping[genreId]).join(', ')}</span>
                <span>Date: {new Date(show.updated).toLocaleDateString()}</span>
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
        <div key={season.season}>
          <h3>Season {season.season}</h3>
          {selectedSeason === season.number ? (
            <ul>
              {season.episodes.map((episode) => (
                <React.Fragment key={episode.id}>
                  <h4>Episode: {episode.episode}</h4>
                  <li>{episode.title}</li>
                  <p>{episode.description}</p>
                  <audio controls>
                    <source src={episode.file} />
                  </audio>
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <div>
              <img src={season.image} alt={`Season ${season.number}`} />
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
