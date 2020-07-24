import React from 'react';
import { Link, useRouteMatch, } from "react-router-dom";

import '../../css/groups/GroupTabs.css';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function GroupTabs({ data }) {
  let match = useRouteMatch();

  let arr = window.location.pathname.split("/");
  let activeTab = arr.length >= 4 ? window.location.pathname.split("/")[3].toLowerCase() : "";

  console.log();

  return (
    <aside>
      <div className="sidebar">
        <h1>{data.name}</h1>
        <Link to={`${match.url}/overview`}><div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>
            Overview
          </h2>
        </div></Link>
        <Link to={`${match.url}/lings`}><div className={`tab ${activeTab === "ling" ? "active" : ""}`}>
          <h2>
            {CapitalCase(TargetToPlural(2, data.ling0_name))}
          </h2>
        </div></Link>
        { data.ling1_name === "not-present" ?
        (
          null
        ) :
        (
          <Link to={`${match.url}/linglets`}><div className={`tab ${activeTab === "linglet" ? "active" : ""}`}>
            <h2>
              {CapitalCase(TargetToPlural(2, data.ling1_name))}
            </h2>
          </div></Link>
        ) }
        <Link to={`${match.url}/properties`}><div className={`tab ${activeTab === "properties" ? "active" : ""}`}>
          <h2>
            Properties
          </h2>
        </div></Link>
        <Link to={`${match.url}/members`}><div className={`tab ${activeTab === "members" ? "active" : ""}`}>
          <h2>
            Members
          </h2>
        </div></Link>
      </div>
    </aside>
  );
}

export default GroupTabs;