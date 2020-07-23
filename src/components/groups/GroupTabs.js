import React from 'react';
import { Link } from "react-router-dom";

import '../../css/groups/GroupTabs.css';

function GroupTabs({ data }) {
  let activeTab = "overview";
  return (
    <aside>
      <div className="sidebar">
        <h1>{data.group}</h1>
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>Overview</h2>
        </div>
        <div className="tab">
          <h2>Properties</h2>
        </div>
        <div className="tab">
          <h2>Members</h2>
        </div>
        <div className="tab">
          <h2>Examples</h2>
        </div>
        <div className="tab">
          <h2>Values</h2>
        </div>
      </div>
    </aside>
  );
}

export default GroupTabs;
