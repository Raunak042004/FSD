import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // pass up the filter
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={handleChange}
    />
  );
};
