import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

export default function SearchBar({ initial = "" }) {
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={onSubmit} role="search" aria-label="Product search" className="search-bar">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          aria-label="Search products"
        />
        <button className="search-btn btn" type="submit">Search</button>
      </form>
    </div>
  );
}
