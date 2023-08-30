import { supabase } from "./Login";
import { useEffect, useState } from "react";

const Fav = () => {
  const [fetchError, setFetchError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  
  useEffect(() => {
    const fetchFav = async () => {
      const { data, error } = await supabase
        .from('Favourites')
        .select('*'); // Specify the columns you want to fetch

      if (error) {
        setFetchError('Could not fetch the fav from table');
        setFavourites([]);
        console.log(error);
      }

      if (data) {
        setFavourites(data);
        setFetchError(null);
      }
    };

    fetchFav();
  }, []);

  return (
    // this enables me to retrive info from the database in this order
  
    <div className="col-sm-6 mb-3">
      <h3>Favourite</h3>

      {fetchError && <p>{fetchError}</p>}
      {favourites.length > 0 && (
        <div className="card">
          {favourites.map((fav) => (
            <div key={fav.id} className="card-body">
              <p className="card-title">Season: {fav.Season}</p>
              <p className="card-text">Episode: {fav.EpisodeTitle}</p>
              <p className="card-text">Episode Number: {fav.EpisodeNumber}</p>
            </div>
          ))}
        </div>
      )}
    
  </div>
  

  
);
};

export default Fav;

