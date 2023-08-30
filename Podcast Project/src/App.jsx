import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Search from './Search';
import { supabase } from './Login';
import './app.css'
import Login from './Login';
import Fav from './DisplayFav';
import logo from '../src/image/kat.png';
import RandomImageCarousel from './float';
import ReadMoreButton from './ReadMore';

const PodcastApp = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filteredShows, setFilteredShows] = useState([]); // Add filteredShows state
  const [isLoggedIn, setIsLoggedIn] = useState('signUpPhase');

  const [favourite, setFavourite] = useState ({
    favouriteShow: '',
    favouriteSeason:''
  })
  
    const [showFav, setShowFav] = useState('');
  
    const handleButtonClick = () => {
      setShowFav('favouritePhase');
    }

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

// fetch for my shows 
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
//  fetch for my seasons and episodes
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
//  my functions for 
  const handleShowClick = (event) => {
    const title = event.target.title
    const id = event.target.id
    fetchShowDetails(id);
    setFavourite(prevdata => ({
      ...prevdata,
      favouriteShow : title
    }))
    }
 
console.log(favourite.favouriteShow)

//  my handles function

  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

// useEffect for sort and search
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

//  my useState and Authentication to my database and email
const [userEmail, setUserEmail] = useState('')
 React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setUserEmail(session.user.email)
        setIsLoggedIn('startPhase')
      }
    });
    return () => { authListener.unsubscribe; };
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }


  if (!selectedShow) {
    return (
      <div className="container">
        <div>
          <nav className="senka">

          </nav>
       
        </div>
        <div className='tlhogo'>
            <img className='logoimg' src={logo} alt="logoo" /> {/* Use the imported logo variable */}
            
            <h1 className='topName'> Multiverse Podcast</h1>
           
          
         <div className='look'>


  {/* this is where i add my search component */}
          <Search
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
            />
         </div>
        </div>
        
{/* This where i redirect my login page */}
        { isLoggedIn === "signUpPhase" && <Login /> }
        { isLoggedIn === 'startPhase' && 
        
        <div className="">
          <RandomImageCarousel/>
          {filteredShows.map((show) => (

// Display all my shows upon Login, my podcast page

<div className="card mb-3"  key={show.id} >
  <div className="row g-0">
  <div className="col-md-4">
   <img src={show.image} alt={show.title} key={show.id} title={show.title} id={show.id} onClick={handleShowClick} />
  </div>
    <div className="col-md-8">
     <div className="card-body">
        <h5 className="card-title">{show.title}</h5>
        {/*  added my read more component  */}

        <ReadMoreButton   
         
          content={show.description}
          />
<span className="pop">Seasons: {show.seasons}</span> 
 <span>{show.genres.map((genreId) => genreTitleMapping[genreId]).join(', ')}</span>
   <p className="card-text"><small className="text-body-secondary">Date: {new Date(show.updated).toLocaleDateString()}</small></p>
  </div>
 </div>
 </div>
</div>
          ))}
        </div>
  }
      </div>
    );
  }
// To get info from my database for my favourites 
  const addToFavourites = async (e) => { 
          const Season = favourite.favouriteShow
        const EpisodeTitle = e.target.getAttribute('data-title')
        const EpisodeDescription = e.target.getAttribute('data-description')
        const EpisodeNumber = e.target.getAttribute('data-episode')
        const EpisodeFile = e.target.getAttribute('data-file')
        const Email = userEmail

                         
      try {
          const { data, error } = await supabase
          .from('Favourites')
          .insert([
              {Season, EpisodeTitle, EpisodeDescription, EpisodeNumber, EpisodeFile, Email },
          ]);
  
          if (error) {
            console.error('Error inserting data:', error.message);
          } else {
            console.log('Data inserted successfully:', data);
          }
        } catch (error) {
          console.error('Error inserting data:', error.message);
        }
      };
  
  return (
    // redirect to the users Favourite
    <>
    {showFav === 'favouritePhase' && <Fav/>} 
  { showFav !== 'favouritePhase' &&
    <>
    {/* This my page for showing all the season and episodes  */}
   <div className="containeer">
    <button onClick={() => setSelectedShow(null)}>Back to Show List</button>
    <h2>{selectedShow.title}</h2>
    {selectedShow.seasons.map((season) => (
      <div key={season.season}>
        <h3>Season {season.season}</h3>
        {selectedSeason === season.number ? (
          <ul>
            {season.episodes.map((episode) => (
              <Fragment key={episode.id}>
                <h4>Episode: {episode.episode}</h4>
                <li>{episode.title}</li>
                <p>{episode.description}</p>
                <audio controls>
                  <source src={episode.file} />
                </audio>
                {/* this the button for my fav  */}

                 <button data-title ={episode.title} 
                         data-file ={episode.file} 
                         data-description = {episode.description} 
                         data-episode ={episode.episode} onClick={addToFavourites}>Add To Favourites</button>
                        
                       <button onClick={handleButtonClick}>Show Favourite</button> 
                </Fragment>
            ))}
          </ul>
        ) : (
          <div>
            {/*  displays the number of season per show */}

            <img src={season.image} alt={`Season ${season.number}`} />
            <div>{season.episodes.length} Episodes</div>
            <button onClick={() => handleSeasonClick(season.number)}>View Episodes</button>
          </div>
        )}
      </div>
    ))}
  </div>
</>
}
</>
  )
  }

export default PodcastApp;
