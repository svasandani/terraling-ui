import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import UserGroups from '../landing/UserGroups';

function Groups() {
  let match = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={`${match.path}/:groupId`}>
          <Group />
        </Route>
        <Route path={match.path}>
          <UserGroups />
        </Route>
      </Switch>
    </Router>
  )
}

function Group() {
  let { groupId } = useParams();
  return <h3>Requested group ID: {groupId}</h3>;
}

export default Groups;
