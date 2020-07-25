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

import AlphaTable from '../shared/AlphaTable';

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

  const [data, setData] = useState({ id: 0, overviewData: {}, lingData: [], lingletData: [], propertyData: [], memberData: [] })

  let { groupId } = useParams();

  // TODO - fetch only active tab? better caching
  useEffect(() => {
    const overviewData =
      fetch("http://192.168.0.19:4000/groups/" + groupId, { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const lingData =
      fetch("http://192.168.0.19:4000/groups/" + groupId + "/lings/depth/0/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const lingletData =
      fetch("http://192.168.0.19:4000/groups/" + groupId + "/lings/depth/1/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const propertyData =
      fetch("http://192.168.0.19:4000/groups/" + groupId + "/properties/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const memberData =
      fetch("http://192.168.0.19:4000/groups/" + groupId + "/memberships/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    Promise.all([overviewData, lingData, lingletData, propertyData, memberData]).then((values) => {
      const newData = { id: groupId };

      newData.overviewData = values[0];
      newData.lingData = values[1];
      newData.lingletData = values[2];
      newData.propertyData = values[3];
      newData.memberData = values[4];

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
        <Route path={`${match.path}/lings`}>
          <AlphaTable name={data.overviewData.ling0_name} data={data.lingData} sort={(a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1 }} />
        </Route>
        <Route path={`${match.path}/linglets`}>
          <AlphaTable name={data.overviewData.ling1_name} data={data.lingletData} sort={(a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1 }} />
        </Route>
        <Route path={`${match.path}/properties`}>
          <AlphaTable name="property" data={data.propertyData} sort={(a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1 }} />
        </Route>
        <Route path={`${match.path}/members`}>
          <AlphaTable name="member" data={data.memberData} sort={(a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1 }} />
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
