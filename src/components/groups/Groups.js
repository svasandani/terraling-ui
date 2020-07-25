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

  let arr = window.location.pathname.split("/");
  let activeTab = arr.length >= 4 ? window.location.pathname.split("/")[3].toLowerCase() : "";

  let tabToProp = {
    "overview": "overviewData",
    "lings": "lingData",
    "linglets": "lingletData",
    "properties": "propertyData",
    "memberships": "memberData"
  }

  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ id: 0, overviewData: {}, lingData: [], lingletData: [], propertyData: [], memberData: [] })

  const nameSort = (a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1; }

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

    let firstPromise = overviewData;

    if (activeTab === "overview") {
      firstPromise = overviewData;
    } else if (activeTab === "lings") {
      firstPromise = lingData;
    } else if (activeTab === "linglets") {
      firstPromise = lingletData;
    } else if (activeTab === "properties") {
      firstPromise = propertyData;
    } else if (activeTab === "members") {
      firstPromise = memberData;
    }

    firstPromise.then((promiseData) => {
      const newData = { ...data };

      newData[tabToProp[activeTab]] = promiseData;

      setData(newData);
      setReady(true);
    });

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
      <Switch>
        <Route path={`${match.path}/overview`}>
          <GroupOverview overviewData={data.overviewData} />
        </Route>
        <Route path={`${match.path}/lings`}>
          <AlphaTable name={data.overviewData.ling0_name} data={data.lingData} sort={nameSort} />
        </Route>
        <Route path={`${match.path}/linglets`}>
          <AlphaTable name={data.overviewData.ling1_name} data={data.lingletData} sort={nameSort} link={(url, id) => { return "lings/" + id; }} />
        </Route>
        <Route path={`${match.path}/properties`}>
          <AlphaTable name="property" data={data.propertyData} sort={nameSort} />
        </Route>
        <Route path={`${match.path}/members`}>
          <AlphaTable name="member" data={data.memberData} sort={nameSort} link={(url, id) => { return "/users/" + id; }} />
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
