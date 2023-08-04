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
    <div className="rati">
      <h3>Favourite</h3>
      {fetchError && <p>{fetchError}</p>}
      {favourites.length > 0 && (

        <div className="rati2">
          {favourites.map((fav) => (
            <div key={fav.id}>
              <p>Season: {fav.Season}</p>
              <p>Episode: {fav.EpisodeTitle}</p>
              <p>Episode Number: {fav.EpisodeNumber}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fav;
