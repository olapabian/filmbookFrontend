import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./peopleSearch.scss";
import Results from "./Results/results";

import {
  getLivePeopleSearchResults,
  getPeopleSearchResults,
} from "../../../Helpers/search_helper";
import { UserInfo } from "../../../Helpers/user_info_helper";
const PeopleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<UserInfo[]>([]);
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
      const results = await getPeopleSearchResults(searchQuery);
      navigate("/peopleResult", { state: { results } });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSearching) {
        const results = await getLivePeopleSearchResults(searchQuery);
        setResults(results);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="main">
      <div className="header-people-search">
        <h1>Znajdź znajomych</h1>
      </div>
      <div className="search-separator"></div>
      <div className="search-field">
        <input
          type="text"
          placeholder="Wyszukaj osoby"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {isSearching && <Results results={results} />}
      </div>
    </div>
  );
};

export default PeopleSearch;
