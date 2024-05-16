import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./movieSearch.scss";
import {
  MovieInfoDto,
  getMovieSearchResults,
  getLiveMovieSearchResults,
} from "./../../../Helpers/search_helper";
import ResultMovies from "./ResultsMovie/resultsMovie";
const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<MovieInfoDto[]>([]);
  const isSearching = searchQuery.trim().length > 0;
  const navigate = useNavigate();

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      const results = await getMovieSearchResults(searchQuery);
      navigate("/movieResult", { state: { results } });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSearching) {
        const results = await getLiveMovieSearchResults(searchQuery);
        setResults(results);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [searchQuery, isSearching]);

  return (
    <div className="main">
      <div className="header-people-search">
        <h1>Znajdź film</h1>
      </div>
      <div className="search-separator"></div>
      <div className="search-field">
        <input
          type="text"
          placeholder="Wyszukaj film"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {isSearching && <ResultMovies results={results} />}{" "}
      </div>
    </div>
  );
};

export default MovieSearch;
