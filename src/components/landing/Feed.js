import React from "react";
import "../../css/landing/Feed.css";

import UserGroups from "./UserGroups";
import Activity from "./Activity";

function Feed({ user }) {
  return (
    <div className="container">
      <UserGroups user={user} />
      <Activity user={user} />
    </div>
  );
}

export default Feed;
