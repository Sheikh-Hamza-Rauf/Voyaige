import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const startingPoint = searchParams.get("startingPoint");
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  return (
    <div className="results-page">
      <h1>Search Results</h1>
      <p><strong>Starting Point:</strong> {startingPoint}</p>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>End Date:</strong> {endDate}</p>

      {/* Here you can display results based on search criteria */}
    </div>
  );
};

export default ResultsPage;
