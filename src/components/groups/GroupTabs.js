import React from 'react';
import { Link } from "react-router-dom";

import '../../css/groups/GroupTabs.css';

function GroupTabs({ data }) {
  let activeTab = window.location.pathname.split("/")[3].toLowerCase();

  return (
    <aside>
      <div className="sidebar">
        <h1>{data.group}</h1>
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>
            <Link to="overview">Overview</Link>
          </h2>
        </div>

        <div className={`tab ${activeTab === "properties" ? "active" : ""}`}>
          <h2>
            <Link to="properties">Properties</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "members" ? "active" : ""}`}>
          <h2>
            <Link to="members">Members</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "examples" ? "active" : ""}`}>
          <h2>
            <Link to="examples">Examples</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "values" ? "active" : ""}`}>
          <h2>
            <Link to="values">Values</Link>
          </h2>
        </div>
      </div>
    </aside>
  );
}

export default GroupTabs;
