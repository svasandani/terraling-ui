import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import UserGroups from '../landing/UserGroups';

function Groups() {
  let match = useRouteMatch();

  const [data, setData] = useState({ id: 0, lings: [] });
  const [lingData, setLingData] = useState({ id: 0, lings: [] });

  return (
    <Router>
      <Switch>
        <Route path={`${match.path}/:groupId`}>
          <Group data={data} setData={setData} lingData={lingData} setLingData={setLingData} />
          <Link to={`${match.path}/8`}>hello</Link>
        </Route>
        <Route path={match.path}>
          <UserGroups />
        </Route>
      </Switch>
    </Router>
  )
}

function Group({ data, setData, lingData, setLingData }) {
  let { groupId } = useParams();

  useEffect(() => {
    fetch("https://ui.terraling.com/api/group/" + groupId)
      .then(response => response.json())
      .then(data => { setData(data) });

    fetch("https://ui.terraling.com/api/lings/" + groupId)
      .then(response => response.json())
      .then(lingData => { setLingData(lingData) });
  }, [groupId]);

  return <h3>Requested group ID: {JSON.stringify(lingData)}</h3>;
}

export default Groups;
