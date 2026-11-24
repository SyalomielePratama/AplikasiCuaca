const SearchBar = ({ value, onChange, onSearch, language = 'id' }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') onSearch();
  };

  const indonesia = language === 'id';

  return (
    <div className="search-row">
      <div className="search-box">
        <input
          className="form-control border-0 shadow-none"
          type="search"
          placeholder={indonesia ? 'Cari nama kota...' : 'Search city...'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={indonesia ? 'Nama kota' : 'City name'}
        />
        <button
          className="search-button"
          onClick={onSearch}
          aria-label={indonesia ? 'Cari cuaca' : 'Search weather'}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
