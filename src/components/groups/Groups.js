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
import GroupOverview from './GroupOverview';
import GroupTabs from './GroupTabs';

function Groups() {
  let match = useRouteMatch();

  const [overviewData, setOverviewData] = useState({ id: 0 });
  const [lingData, setLingData] = useState({ id: 0, lings: [] });

  return (
    <Router>
      <Switch>
        <Route path={`${match.path}/:groupId`}>
          <Group overviewData={overviewData} setOverviewData={setOverviewData} lingData={lingData} setLingData={setLingData} />
        </Route>
        <Route path={match.path}>
          <UserGroups />
        </Route>
      </Switch>
    </Router>
  )
}

function Group({ overviewData, setOverviewData, lingData, setLingData }) {
  let match = useRouteMatch();

  let { groupId } = useParams();

  useEffect(() => {
    fetch("https://ui.terraling.com/api/group/" + groupId)
      .then(response => response.json())
      .then(overviewD => { setOverviewData(overviewD) });

    fetch("https://ui.terraling.com/api/lings/" + groupId)
      .then(response => response.json())
      .then(lingData => { setLingData(lingData) });
  }, [groupId]);

  return (
    <div className="container">
      <GroupTabs data={overviewData} />
      <Router>
        <Switch>
          <Route path={`${match.path}/overview`}>
            <GroupOverview overviewData={overviewData} />
          </Route>
          <Route path={match.path}>
            <main>
              <section id="no-tab-selected">
                <h2>No tab selected. Please select a tab.</h2>
              </section>
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Groups;
