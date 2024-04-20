import React, { FC } from "react";
import "./results.scss";
export interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  friendsIds: string;
  folllowingIds: string;
  followersIds: string;
}
interface ResultsProps {
  results: UserInfo[];
}

const Results: FC<ResultsProps> = ({ results }) => {
  return (
    <div className="results-container">
      <div className="search-inside-separator"></div>
      {results.map((result, index) => (
        <div key={index} className="result-item">
          {result.firstName}
        </div>
      ))}
    </div>
  );
};

export default Results;
