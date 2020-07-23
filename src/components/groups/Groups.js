import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

function Groups() {
  let match = useRouteMatch();

  return (
    <>
      <Link to={`${match.url}/components`}>Components</Link>
      <h1>group</h1>

      <Switch>
        <Route path={`${match.path}/:groupId`}>
          <Group />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </>
  )
}

function Group() {
  let { groupId } = useParams();
  return <h3>Requested group ID: {groupId}</h3>;
}

export default Groups;
