import React, { Component, ChangeEvent } from "react";
import "./peopleSearch.scss";
import Results from "./Results/results";
import {
  getLivePeopleSearchResults,
  UserInfo,
} from "../../../Helpers/search_helper"; // Dodaj import funkcji getLivePeopleSearchResults i interfejsu UserInfo

interface PeopleSearchState {
  searchQuery: string;
  results: UserInfo[]; // Zmieniłem typ results na UserInfo[]
}

class PeopleSearch extends Component<{}, PeopleSearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: "",
      results: [],
    };
  }

  handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchQuery: value }, async () => {
      const results = await getLivePeopleSearchResults(value);
      this.setState({ results });
    });
  };

  render() {
    const { results, searchQuery } = this.state;
    // Sprawdź, czy searchQuery ma jakąś wartość
    const isSearching = searchQuery.trim().length > 0;

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
            onChange={this.handleInputChange}
          />
          {isSearching && <Results results={results} />}
        </div>
      </div>
    );
  }
}

export default PeopleSearch;
