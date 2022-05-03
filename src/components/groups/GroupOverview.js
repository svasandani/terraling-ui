import React from "react";

function GroupOverview({ overviewData }) {
  return (
    <>
      <h1>Overview</h1>
      <h2>Description</h2>
      <div className="card group-description">No description provided.</div>
      <h2>Maintainers</h2>
      <div className="card group-description">No maintainers provided.</div>
    </>
  );
}

export default GroupOverview;
