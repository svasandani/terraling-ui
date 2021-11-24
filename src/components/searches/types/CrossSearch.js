import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../../shared/SelectTable';
import Divider from '../../shared/Divider';
import List from '../../shared/List';

import { CapitalCase } from '../../helpers/Helpers';

function CrossSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();
  const history = useHistory();

  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);

  const buildLingPropertySearch = () => {
    let searchData = {
      group: parseInt(data.id),
      ling_properties: lingPropertyArr.map(lingProperty => parseInt(lingProperty.id))
    }

    setSearchData({
      href: "cross/ling_properties",
      data: searchData
    });
  };

  const buildLingletPropertySearch = () => {
    let searchData = {
      group: parseInt(data.id),
      linglet_properties: lingletPropertyArr.map(lingletProperty => parseInt(lingletProperty.id))
    }

    setSearchData({
      href: "cross/linglet_properties",
      data: searchData
    });
  };

  let searchTargets = [{"name": `Cross two or more ${CapitalCase(data.overviewData.ling0_name)} properties`, "id": "lings"}];
  if (data.overviewData.depth_maximum > 0) {
    searchTargets.push({"name": `Cross two or more ${CapitalCase(data.overviewData.ling1_name)} properties`, "id": "linglets"});
  }

  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = ""

    if (searchTargets.length === 1) {
      history.push(`${match.url}/${searchTargets[0].id}`)
    }

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
          <h2>{CapitalCase(data.overviewData.ling0_name) + " properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingPropertyArr)}>Reset</Link></h2>
          <SelectTable data={data.lingPropertyData} columnMap={["name"]} selectArr={lingPropertyArr} setSelectArr={setLingPropertyArr} maxHeight="250px" />
          <Divider />
          <List data={lingPropertyArr} field="name" heading={`Crossing ${lingPropertyArr.length} propert${lingPropertyArr.length === 1 ? 'y' : 'ies'}:`} />
          {
            lingPropertyArr.length <= 1 ?
            <p>Select at least two properties to cross.</p> :
            <Link className="cta" to={`${searchPath}/results`} onClick={buildLingPropertySearch}>Search</Link>
          }
        </Route>
        <Route path={`${match.path}/linglets`}>
          {
            data.overviewData.depth_maximum > 0 ?
            (
              <>
                <h2>{CapitalCase(data.overviewData.ling1_name) + " properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletPropertyArr)}>Reset</Link></h2>
                <SelectTable data={data.lingletPropertyData} columnMap={["name"]} selectArr={lingletPropertyArr} setSelectArr={setLingletPropertyArr} maxHeight="250px" />
                <Divider />
                <List data={lingletPropertyArr} field="name" heading={`Crossing ${lingletPropertyArr.length} propert${lingletPropertyArr.length === 1 ? 'y' : 'ies'}:`} />
                {
                  lingletPropertyArr.length <= 1 ?
                  <p>Select at least two properties to cross.</p> :
                  <Link className="cta" to={`${searchPath}/results`} onClick={buildLingletPropertySearch}>Search</Link>
                }
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
