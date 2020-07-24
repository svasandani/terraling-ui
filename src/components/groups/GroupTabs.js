import React from 'react';
import { Link, useRouteMatch, } from "react-router-dom";

import '../../css/groups/GroupTabs.css';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function GroupTabs({ data }) {
  let match = useRouteMatch();

  let arr = window.location.pathname.split("/");
  let activeTab = arr.length >= 4 ? window.location.pathname.split("/")[3].toLowerCase() : "";

  return (
    <aside>
      <div className="sidebar">
        <h1>{data.name}</h1>
        <div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/overview`}>Overview</Link>
          </h2>
        </div>
        <div className={`tab ${activeTab === "ling0" ? "active" : ""}`}>
          <h2>
            <Link to={`${match.url}/ling`}>{CapitalCase(TargetToPlural(2, data.ling0_name))}</Link>
          </h2>
        </div>
        { data.ling1_name === "not-present" ?
        (
          null
        ) :
        (
          <div className={`tab ${activeTab === "ling1" ? "active" : ""}`}>
            <h2>
              <Link to={`${match.url}/overview`}>{CapitalCase(TargetToPlural(2, data.ling1_name))}</Link>
            </h2>
          </div>
        ) }
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
