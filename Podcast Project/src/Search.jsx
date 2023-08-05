

const Search = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
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

  return (
    <div className="kati"> {/* Add a class to the div container */}
      <input type="text" placeholder="Search shows" value={searchQuery} onChange={handleSearchChange} />

      <select value={sortBy} onChange={handleSortChange}>
        <option value="title">Sort A - Z</option>
        <option value="genre">Sort by Genre</option>
        <option value="date">Sort by Date</option>
      </select>
    </div>
  );
};

export default Search;
