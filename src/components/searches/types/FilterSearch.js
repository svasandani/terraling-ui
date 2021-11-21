import React, { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../../shared/SelectTable';

import List from '../../shared/List';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

const FilterLingSearch = '';
const FilterLingPropertySearch = '';
const FilterLingletSearch = '';
const FilterLingletPropertySearch = '';

function FilterSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();

  const [filterTargetsArr, setfilterTargetsArr] = useState([]);
  
  const [lingArr, setLingArr] = useState([]);
  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);

  const [lingPropertyInclusivity, setLingPropertyInclusivity] = useState([{ name: "Find data that has ANY of these properties", id: "any"}]);
  const [lingletPropertyInclusivity, setLingletPropertyInclusivity] = useState([{ name: "Find data that has ANY of these properties", id: "any"}]);

  const propertyInclusivityData = [{ name: "Find data that has ANY of these properties", id: "any"}, {name: "Find data that has ALL of these properties", id: "all" }]

  const filterTargets = [{"name": `Filter by ${CapitalCase(data.overviewData.ling0_name)}`, "id": "lings"}, {"name": `Filter by ${CapitalCase(data.overviewData.ling0_name)} Property`, "id": "ling_properties"}];
  if (data.overviewData.depth_maximum > 0) {
    filterTargets.push([{"name": `Filter by ${CapitalCase(data.overviewData.ling1_name)}`, id: "linglets"}, {"name": `Filter by ${CapitalCase(data.overviewData.ling1_name)} Property`, "id": "linglet_properties"}]);
  }

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = ""

    if (filterTargetsArr.length === 1) {
      oldid = filterTargetsArr[0].id;
    }

    filterTargets.forEach(target => {
      if (window.location.href.includes(target.id)) {
        contains = true;
        if (oldid !== target.id) {
          isNew = true;
          hrefTarget = target;
        }
      }
    })

    if (isNew) setfilterTargetsArr([hrefTarget]);
    else if (!contains && filterTargetsArr.length > 0) setfilterTargetsArr([]);
  }, [window.location.href, filterTargetsArr]);

  const buildSearch = () => {
    let lingPropertyCategoryId = data.lingPropertyData[0].category_id;

    let searchObj = {
      search: {
        // include: { ling_0: 1, property_0: 1, value_0: 1, example_0: 1 },
        lings: { "0": lingArr.reduce((ids, ling) => { ids.push(ling.id.toString()); return ids; }, [""]) },
        properties: { [lingPropertyCategoryId]: lingPropertyArr.reduce((ids, lingProperty) => { ids.push(lingProperty.id.toString()); return ids; }, [""]) },
        property_set: { [lingPropertyCategoryId]: lingPropertyInclusivity[0].id },
        // ling_keywords: { [propertyCategoryId]: "" },
        // lings_props: { [propertyCategoryId]: [""] },
        // lings_property_set: { [propertyCategoryId]: "any" },
        // example_fields: { "0": "description" },
        // example_keywords: { "0": "" },
        javascript: true
      },
      group_id: data.id
    }

    if (data.overviewData.depth_maximum > 0) {
      let lingletPropertyCategoryId = data.lingletPropertyData[0].category_id;

      searchObj.search.lings[1] = lingletArr.reduce((ids, linglet) => { ids.push(linglet.id.toString()); return ids; }, [""]);
      searchObj.search.properties[lingletPropertyCategoryId] = lingletPropertyArr.reduce((ids, lingletProperty) => { ids.push(lingletProperty.id.toString()); return ids; }, [""]);
      searchObj.search.property_set[lingletPropertyCategoryId] = lingletPropertyInclusivity[0].id;
    }

    setSearchData(searchObj);
  };

  return (
    <>
      <h2>Filter target</h2>
      <SelectTable data={filterTargets} columnMap={["name"]} selectArr={filterTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setfilterTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
      <Switch>
          <Route path={`${match.path}/lings`}>
            <div />
          </Route>
          <Route path={`${match.path}/ling_properties`}>
            <div />
          </Route>
          <Route path={`${match.path}/linglets`}>
            <div />
          </Route>
          <Route path={`${match.path}/linglet_properties`}>
            <div />
          </Route>
        </Switch>
      <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingArr)}>Reset</Link></h2>
      <SelectTable data={data.lingData} columnMap={["name"]} selectArr={lingArr} setSelectArr={setLingArr} maxHeight="250px" />
      <h2>{CapitalCase(data.overviewData.ling0_name) + " Properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingPropertyArr)}>Reset</Link></h2>
      <SelectTable data={data.lingPropertyData} columnMap={["name"]} selectArr={lingPropertyArr} setSelectArr={setLingPropertyArr} maxHeight="250px" />
      {
        lingPropertyArr.length > 0 ?
        (
          <>
            <h2>{CapitalCase(data.overviewData.ling0_name) + " Property inclusivity"}</h2>
            <SelectTable data={propertyInclusivityData} columnMap={["name"]} selectArr={lingPropertyInclusivity} setSelectArr={setLingPropertyInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
          </>
        ) :
        (
          null
        )
      }
      {
        data.overviewData.depth_maximum > 0 ?
        (
          <>
            <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletArr)}>Reset</Link></h2>
            <SelectTable data={data.lingletData} columnMap={["name"]} selectArr={lingletArr} setSelectArr={setLingletArr} maxHeight="250px" />
            <h2>{CapitalCase(data.overviewData.ling1_name) + " Properties"} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletPropertyArr)}>Reset</Link></h2>
            <SelectTable data={data.lingletPropertyData} columnMap={["name"]} selectArr={lingletPropertyArr} setSelectArr={setLingletPropertyArr} maxHeight="250px" />
            {
              lingletPropertyArr.length > 0 ?
              (
                <>
                  <h2>{CapitalCase(data.overviewData.ling1_name) + " Property inclusivity"}</h2>
                  <SelectTable data={propertyInclusivityData} columnMap={["name"]} selectArr={lingletPropertyInclusivity} setSelectArr={setLingletPropertyInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
                </>
              ) :
              (
                null
              )
            }
          </>
        ) :
        (
          null
        )
      }
      <Link className="cta" to={`${searchPath}/results`} onClick={buildSearch}>Search</Link>
    </>
  )
}

export default FilterSearch;
