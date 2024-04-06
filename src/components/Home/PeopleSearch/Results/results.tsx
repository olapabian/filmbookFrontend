import React, { FC } from "react";
import "./results.scss";

interface ResultsProps {
  results: string[];
}

const Results: FC<ResultsProps> = ({ results }) => {
  return (
    <div className="results-container">
      <div className="search-inside-separator"></div>
      {results.map((result, index) => (
        <div key={index} className="result-item">
          {result}
        </div>
      ))}
    </div>
  );
};

export default Results;
