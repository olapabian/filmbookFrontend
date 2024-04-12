import React, { Component, ChangeEvent } from "react";
import "./peopleSearch.scss";
import Results from "./Results/results";

interface PeopleSearchState {
  searchQuery: string;
  results: string[];
}

class PeopleSearch extends Component<{}, PeopleSearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: "",
      results: [],
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchQuery: value }, () => {
      const results = this.generateRandomResults();
      this.setState({ results });
    });
  };

  generateRandomResults = (): string[] => {
    const { searchQuery } = this.state;
    const results: string[] = [];
    for (let i = 0; i < 11; i++) {
      results.push(`${searchQuery}${i}`);
    }
    return results;
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
