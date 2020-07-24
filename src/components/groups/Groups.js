import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import UserGroups from '../landing/UserGroups';
import GroupOverview from './GroupOverview';
import GroupTabs from './GroupTabs';

function Groups() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:groupId`}>
        <Group />
      </Route>
      <Route path={match.path}>
        <UserGroups />
      </Route>
    </Switch>
  )
}

function Group() {
  let match = useRouteMatch();

  const [data, setData] = useState({ id: 0, overviewData: {}, lingData: { lings: [] } })

  let { groupId } = useParams();

  useEffect(() => {
    const overviewData =
      fetch("https://ui.terraling.com/api/group/" + groupId)
        .then(response => response.json());

    const lingData =
      fetch("https://ui.terraling.com/api/lings/" + groupId)
        .then(response => response.json());

    Promise.all([overviewData, lingData]).then((values) => {
      const newData = { id: groupId };

      newData.overviewData = values[0];
      newData.lingData = values[1];

      setData(newData);
    });

  }, [groupId]);

  return (
    <div className="container">
      <GroupTabs data={data.overviewData} />
      {/* TODO - literally the rest of this group view */}
      <Switch>
        <Route path={`${match.path}/overview`}>
          <GroupOverview overviewData={data.overviewData} />
        </Route>
        <Route exact path={match.path}>
          <main>
            <section id="no-tab-selected">
              <h2>No tab selected. Please select a tab.</h2>
            </section>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default Groups;
