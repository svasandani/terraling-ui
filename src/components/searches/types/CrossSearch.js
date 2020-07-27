import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../../shared/SelectTable';

import List from '../../shared/List';

import { CapitalCase } from '../../helpers/Helpers';

function CrossSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();

  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);

  const buildLingPropertySearch = () => {
    let propertyCategoryId = data.lingPropertyData[0].category_id;

    let searchArr = {
      search: {
        properties: { [propertyCategoryId]: lingPropertyArr.reduce((ids, linglet) => { ids.push(linglet.id.toString()); return ids; }, []) },
        property_set: { [propertyCategoryId]: "cross" }
      },
      group_id: data.id
    }

    setSearchData(searchArr);
  };

  const buildLingletPropertySearch = () => {
    let propertyCategoryId = data.lingletPropertyData[0].category_id;

    let searchArr = {
      search: {
        properties: { [propertyCategoryId]: lingletPropertyArr.reduce((ids, linglet) => { ids.push(linglet.id.toString()); return ids; }, []) },
        property_set: { [propertyCategoryId]: "cross" }
      },
      group_id: data.id
    }

    setSearchData(searchArr);
  };

  let searchTargets = [];

  if (data.overviewData.depth_maximum > 0) {
    searchTargets = [{"name": CapitalCase(data.overviewData.ling0_name) + " Properties", "id": "lings"}, {"name": CapitalCase(data.overviewData.ling1_name) + " Properties", "id": "linglets"}];
  } else {
    searchTargets = [{"name": CapitalCase(data.overviewData.ling0_name) + " Properties", "id": "lings"}];
  }

  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = ""

    if (searchTargetsArr.length === 1) {
      oldid = searchTargetsArr[0].id;
    }

    searchTargets.forEach(target => {
      if (window.location.href.includes(target.id)) {
        contains = true;
        if (oldid !== target.id) {
          isNew = true;
          hrefTarget = target;
        }
      }
    })

    if (isNew) setSearchTargetsArr([hrefTarget]);
    else if (!contains && searchTargetsArr.length > 0) setSearchTargetsArr([]);
  }, [data, searchTargetsArr])

  return (
    <>
      <h2>Search target</h2>
      <SelectTable data={searchTargets} columnMap={["name"]} selectArr={searchTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
      <Switch>
        <Route path={`${match.path}/lings`}>
          <h2>{CapitalCase(data.overviewData.ling0_name) + " Properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingPropertyArr)}>Reset</Link></h2>
          <SelectTable data={data.lingPropertyData} columnMap={["name"]} selectArr={lingPropertyArr} setSelectArr={setLingPropertyArr} maxHeight="250px" />
          <List data={lingPropertyArr} field="name" heading="Your search parameters" />
          <Link className="cta" to={`${searchPath}/results`} onClick={buildLingPropertySearch}>Search</Link>
        </Route>
        <Route path={`${match.path}/linglets`}>
          {
            data.overviewData.depth_maximum > 0 ?
            (
              <>
                <h2>{CapitalCase(data.overviewData.ling1_name) + " Properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletPropertyArr)}>Reset</Link></h2>
                <SelectTable data={data.lingletPropertyData} columnMap={["name"]} selectArr={lingletPropertyArr} setSelectArr={setLingletPropertyArr} maxHeight="250px" />
                <List data={lingletPropertyArr} field="name" heading="Your search parameters" />
                <Link className="cta" to={`${searchPath}/results`} onClick={buildLingletPropertySearch}>Search</Link>
              </>
            ) :
            (
              null
            )
          }
        </Route>
      </Switch>
    </>
  )
}

export default CrossSearch;
