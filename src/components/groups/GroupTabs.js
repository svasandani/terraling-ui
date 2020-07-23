import React from 'react';
import { Link, useRouteMatch, } from "react-router-dom";

import '../../css/groups/GroupTabs.css';

function GroupTabs({ data }) {
  let match = useRouteMatch();

  let arr = window.location.pathname.split("/");
  let activeTab = arr.length >= 4 ? window.location.pathname.split("/")[3].toLowerCase() : "";

  console.log(match);

  return (
    <aside>
      <div className="sidebar">
        <h1>{data.group}</h1>
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/overview`}>Overview</Link>
          </h2>
        </div>

        <div className={`tab ${activeTab === "properties" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/properties`}>Properties</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "members" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/members`}>Members</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "examples" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/examples`}>Examples</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "values" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/values`}>Values</Link>
          </h2>
        </div>
      </div>
    </aside>
  );
}

export default GroupTabs;
