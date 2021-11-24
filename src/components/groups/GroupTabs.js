import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "../../css/groups/GroupTabs.css";

import { CapitalCase, TargetToPlural } from "../helpers/Helpers";

function GroupTabs({ data }) {
  let match = useRouteMatch();

  let arr = window.location.pathname.split("/");
  let activeTab =
    arr.length >= 4 ? window.location.pathname.split("/")[3].toLowerCase() : "";

  return (
    <aside>
      <div className="sidebar tab-sidebar">
        <h1>{data.name}</h1>
        {/* <Link to={`${match.url}/overview`}><div className={`tab ${activeTab === "overview" ? "active" : ""}`}>
          <h2>
            Overview
          </h2>
        </div></Link> */}
        <Link to={`${match.url}/searches/new`}>
          <div className={`tab ${activeTab === "searches" ? "active" : ""}`}>
            <h2>Search</h2>
          </div>
        </Link>
        <Link to={`${match.url}/lings`}>
          <div className={`tab ${activeTab === "lings" ? "active" : ""}`}>
            <h2>{CapitalCase(TargetToPlural(2, data.ling0_name))}</h2>
          </div>
        </Link>
        {data.depth_maximum > 0 ? (
          <Link to={`${match.url}/linglets`}>
            <div className={`tab ${activeTab === "linglets" ? "active" : ""}`}>
              <h2>{CapitalCase(TargetToPlural(2, data.ling1_name))}</h2>
            </div>
          </Link>
        ) : null}
        <Link to={`${match.url}/properties`}>
          <div className={`tab ${activeTab === "properties" ? "active" : ""}`}>
            <h2>Properties</h2>
          </div>
        </Link>
        <Link to={`${match.url}/members`}>
          <div className={`tab ${activeTab === "members" ? "active" : ""}`}>
            <h2>Members</h2>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default GroupTabs;
