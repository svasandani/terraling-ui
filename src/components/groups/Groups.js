import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import UserGroups from '../landing/UserGroups';

import GroupTabs from './GroupTabs';
import GroupOverview from './GroupOverview';
import Ling from '../lings/Ling'

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

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

  const columnMap = ["name"];

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
    });

  }, [groupId]);

  if (!ready) return(
    <main>
      <section id="container">
        <Loading />
      </section>
    </main>
  );

  return (
    <main>
      <div className="container">
        <GroupTabs data={data.overviewData} />
        <section id="data">
          <Switch>
            <Route path={`${match.path}/overview`}>
              <GroupOverview overviewData={data.overviewData} columnMap={columnMap} />
            </Route>
            <Route path={`${match.path}/lings/:lingId`}>
              <Ling groupId={groupId} />
            </Route>
            <Route path={`${match.path}/lings`}>
              <h1>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}</h1>
              <AlphaTable data={data.lingData} sort={nameSort} columnMap={columnMap} />
            </Route>
            <Route path={`${match.path}/linglets`}>
              {
                data.overviewData.depth_maximum > 0 ?
                (
                  <>
                    <h1>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}</h1>
                    <AlphaTable data={data.lingletData} sort={nameSort} link={(url, id) => { return "lings/" + id; }} columnMap={columnMap} />
                  </>
                ) :
                (
                  <Redirect to={`${match.url}/lings`} />
                )
              }
            </Route>
            <Route path={`${match.path}/properties`}>
              <h1>Properties</h1>
              <AlphaTable data={data.propertyData} sort={nameSort} columnMap={columnMap} />
            </Route>
            <Route path={`${match.path}/members`}>
              <h1>Members</h1>
              <AlphaTable data={data.memberData} sort={nameSort} link={(url, id) => { return "/users/" + id; }} columnMap={columnMap} />
            </Route>
            <Route exact path={match.path}>
              <div className="no-tab-selected">
                <h2>No tab selected. Please select a tab.</h2>
              </div>
            </Route>
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default Groups;
