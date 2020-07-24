import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import UserGroups from '../landing/UserGroups';

import GroupTabs from './GroupTabs';
import GroupOverview from './GroupOverview';
import GroupLings from './GroupLings';

import Loading from '../shared/Loading';

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

  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ id: 0, overviewData: {}, lingData: { lings: [] } })

  let { groupId } = useParams();

  // TODO - fetch only active tab? better caching
  useEffect(() => {
    const overviewData =
      fetch("http://192.168.0.19:4000/groups/" + groupId, { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const lingData =
      fetch("http://192.168.0.19:4000/groups/" + groupId + "/lings/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    Promise.all([overviewData, lingData]).then((values) => {
      const newData = { id: groupId };

      newData.overviewData = values[0];
      newData.lingData = values[1];

      setData(newData);
      setReady(true);
    });

  }, [groupId]);

  if (!ready) return(<Loading />)

  return (
    <div className="container">
      <GroupTabs data={data.overviewData} />
      {/* TODO - literally the rest of this group view */}
      <Switch>
        <Route path={`${match.path}/overview`}>
          <GroupOverview overviewData={data.overviewData} />
        </Route>
        <Route path={`${match.path}/ling`}>
          <GroupLings lingName={data.overviewData.ling0_name} lingData={data.lingData} />
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
