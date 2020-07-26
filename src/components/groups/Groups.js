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
import Property from '../properties/Property'

import Search from '../searches/Search'

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

  const [data, setData] = useState({ id: 0, overviewData: {}, lingData: [], lingletData: [], propertyData: [], lingPropertyData: [], lingletPropertyData: [], memberData: [] })

  const nameSort = (a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1; }

  const columnMap = ["name"];

  let { groupId } = useParams();

  useEffect(() => {
    const overviewData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId, { headers:{'accept': 'application/json'} })
        .then(response => response.json());

    const lingData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/lings/depth/0/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

    const lingletData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/lings/depth/1/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

    const propertyData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/properties/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

    const lingPropertyData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/properties/depth/0/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

    const lingletPropertyData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/properties/depth/1/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

    const memberData =
      fetch(process.env.REACT_APP_API + "groups/" + groupId + "/memberships/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then(data => {
          data = data.sort(nameSort);
          return data;
        });

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

    Promise.all([overviewData, lingData, lingletData, propertyData, lingPropertyData, lingletPropertyData, memberData]).then((values) => {
      const newData = { id: groupId };

      newData.overviewData = values[0];
      newData.lingData = values[1];
      newData.lingletData = values[2];
      newData.propertyData = values[3];
      newData.lingPropertyData = values[4];
      newData.lingletPropertyData = values[5];
      newData.memberData = values[6];

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
            <Route path={`${match.path}/searches`}>
              <Search data={data} />
            </Route>
            <Route path={`${match.path}/lings/:lingId`}>
              <Ling groupId={groupId} />
            </Route>
            <Route path={`${match.path}/lings`}>
              <h1>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}</h1>
              <AlphaTable data={data.lingData} columnMap={columnMap} />
            </Route>
            <Route path={`${match.path}/linglets`}>
              {
                data.overviewData.depth_maximum > 0 ?
                (
                  <>
                    <h1>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}</h1>
                    <AlphaTable data={data.lingletData} link={(url, id) => { return "lings/" + id; }} columnMap={columnMap} />
                  </>
                ) :
                (
                  <Redirect to={`${match.url}/lings`} />
                )
              }
            </Route>
            <Route path={`${match.path}/properties/:propertyId`}>
              <Property groupId={groupId} />
            </Route>
            <Route path={`${match.path}/properties`}>
              <h1>Properties</h1>
              <AlphaTable data={data.propertyData} columnMap={columnMap} />
            </Route>
            <Route path={`${match.path}/members`}>
              <h1>Members</h1>
              <AlphaTable data={data.memberData} link={(url, id) => { return "/users/" + id; }} columnMap={columnMap} />
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
