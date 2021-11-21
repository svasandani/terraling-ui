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

const FilterLingSearch = ({ data, reset, setSearchData, searchPath }) => {
  const [lingArr, setLingArr] = useState([]);
  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingPropertyInclusivity, setLingPropertyInclusivity] = useState([{ name: "Find data that has ANY of these properties", id: "false"}]);
  const propertyInclusivityData = [{ name: "Find data that has ANY of these properties", id: "false"}, {name: "Find data that has ALL of these properties", id: "true" }];

  const buildSearch = () => {
    let searchObj = {
      group: data.id,
      lings: lingArr
    }

    if (lingPropertyArr.length > 0) {
      searchObj.ling_properties = lingPropertyArr;
      searchObj.ling_properties_inclusive = lingPropertyInclusivity;
    }

    setSearchData(searchObj);
  };
  
  return (
    <>
      <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingArr)}>Reset</Link></h2>
      <SelectTable data={data.lingData} columnMap={["name"]} selectArr={lingArr} setSelectArr={setLingArr} maxHeight="250px" />
      <h2>{CapitalCase(data.overviewData.ling0_name) + " properties to display"} (defaults to all) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingPropertyArr)}>Reset</Link></h2>
      <SelectTable data={data.lingPropertyData} columnMap={["name"]} selectArr={lingPropertyArr} setSelectArr={setLingPropertyArr} maxHeight="250px" />
      {
        lingPropertyArr.length > 0 ?
        (
          <>
            <h2>{CapitalCase(data.overviewData.ling0_name) + " property inclusivity"}</h2>
            <SelectTable data={propertyInclusivityData} columnMap={["name"]} selectArr={lingPropertyInclusivity} setSelectArr={setLingPropertyInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
          </>
        ) :
        (
          null
        )
      }
      {
      lingArr.length > 0 ?
      (
        <Link className="cta" to={`${searchPath}/results`} onClick={buildSearch}>Search</Link>
      ) :
      (
        <>
          {`Select at least one ${data.overviewData.ling0_name} to filter.`}
        </>
      )
    }
    </>
  )
};
const FilterLingPropertySearch = ({ data, reset, setSearchData, searchPath }) => {
  const [propertyArr, setPropertyArr] = useState([]);
  const [lingArr, setLingArr] = useState([]);
  const [lingInclusivity, setLingInclusivity] = useState([{ name: `Find properties that have ANY of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}`, id: "false"}]);
  const lingInclusivityData = [{ name: `Find properties that have ANY of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}`, id: "false"}, {name: `Find properties that have ALL of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}`, id: "true" }];

  const buildSearch = () => {
    let searchObj = {
      group: data.id,
      ling_properties: propertyArr
    }

    if (lingArr.length > 0) {
      searchObj.lings = lingArr;
      searchObj.lings_inclusive = lingInclusivity;
    }

    setSearchData(searchObj);
  };
  
  return (
    <>
    <h2>{CapitalCase(data.overviewData.ling0_name) + " properties"} <Link className="reset-btn" to="." onClick={(e) => reset(e, setPropertyArr)}>Reset</Link></h2>
    <SelectTable data={data.lingPropertyData} columnMap={["name"]} selectArr={propertyArr} setSelectArr={setPropertyArr} maxHeight="250px" />
      <h2>{`${CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} to display`} (defaults to all) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingArr)}>Reset</Link></h2>
      <SelectTable data={data.lingData} columnMap={["name"]} selectArr={lingArr} setSelectArr={setLingArr} maxHeight="250px" />
      {
        lingArr.length > 0 ?
        (
          <>
            <h2>{CapitalCase(data.overviewData.ling0_name) + " inclusivity"}</h2>
            <SelectTable data={lingInclusivityData} columnMap={["name"]} selectArr={lingInclusivity} setSelectArr={setLingInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
          </>
        ) :
        (
          null
        )
      }
      {
      propertyArr.length > 0 ?
      (
        <Link className="cta" to={`${searchPath}/results`} onClick={buildSearch}>Search</Link>
      ) :
      (
        <>
          {`Select at least one property to filter.`}
        </>
      )
    }
    </>
  )
};
const FilterLingletSearch = ({ data, reset, setSearchData, searchPath }) => {
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);
  const [lingletPropertyInclusivity, setLingletPropertyInclusivity] = useState([{ name: "Find data that has ANY of these properties", id: "false"}]);
  const propertyInclusivityData = [{ name: "Find data that has ANY of these properties", id: "false"}, {name: "Find data that has ALL of these properties", id: "true" }];

  const buildSearch = () => {
    let searchObj = {
      group: data.id,
      linglets: lingletArr
    }

    if (lingletPropertyArr.length > 0) {
      searchObj.linglet_properties = lingletPropertyArr;
      searchObj.linglet_properties_inclusive = lingletPropertyInclusivity;
    }

    setSearchData(searchObj);
  };
  
  return (
    <>
    <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))} <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletArr)}>Reset</Link></h2>
    <SelectTable data={data.lingletData} columnMap={["name"]} selectArr={lingletArr} setSelectArr={setLingletArr} maxHeight="250px" />
    <h2>{CapitalCase(data.overviewData.ling1_name) + " properties to display"} (defaults to all) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletPropertyArr)}>Reset</Link></h2>
    <SelectTable data={data.lingletPropertyData} columnMap={["name"]} selectArr={lingletPropertyArr} setSelectArr={setLingletPropertyArr} maxHeight="250px" />
    {
      lingletPropertyArr.length > 0 ?
      (
        <>
          <h2>{CapitalCase(data.overviewData.ling1_name) + " property inclusivity"}</h2>
          <SelectTable data={propertyInclusivityData} columnMap={["name"]} selectArr={lingletPropertyInclusivity} setSelectArr={setLingletPropertyInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
        </>
      ) :
      (
        null
      )
    }
    {
      lingletArr.length > 0 ?
      (
        <Link className="cta" to={`${searchPath}/results`} onClick={buildSearch}>Search</Link>
      ) :
      (
        <>
          {`Select at least one ${data.overviewData.ling1_name} to filter.`}
        </>
      )
    }
  </>
  )
};
const FilterLingletPropertySearch = ({ data, reset, setSearchData, searchPath }) => {
  const [propertyArr, setPropertyArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletInclusivity, setLingletInclusivity] = useState([{ name: `Find properties that have ANY of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}`, id: "false"}]);
  const lingletInclusivityData = [{ name: `Find properties that have ANY of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}`, id: "false"}, {name: `Find properties that have ALL of these ${CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}`, id: "true" }];

  const buildSearch = () => {
    let searchObj = {
      group: data.id,
      linglet_properties: propertyArr
    }

    if (lingletArr.length > 0) {
      searchObj.linglets = lingletArr;
      searchObj.linglets_inclusive = lingletInclusivity;
    }

    setSearchData(searchObj);
  };
  
  return (
    <>
    <h2>{CapitalCase(data.overviewData.ling1_name) + " properties"} <Link className="reset-btn" to="." onClick={(e) => reset(e, setPropertyArr)}>Reset</Link></h2>
    <SelectTable data={data.lingletPropertyData} columnMap={["name"]} selectArr={propertyArr} setSelectArr={setPropertyArr} maxHeight="250px" />
      <h2>{`${CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))} to display`} (defaults to all) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletArr)}>Reset</Link></h2>
      <SelectTable data={data.lingletData} columnMap={["name"]} selectArr={lingletArr} setSelectArr={setLingletArr} maxHeight="250px" />
      {
        lingletArr.length > 0 ?
        (
          <>
            <h2>{CapitalCase(data.overviewData.ling1_name) + " inclusivity"}</h2>
            <SelectTable data={lingletInclusivityData} columnMap={["name"]} selectArr={lingletInclusivity} setSelectArr={setLingletInclusivity} maxHeight="250px" maxSelect={1} replaceWithNew={true} />
          </>
        ) :
        (
          null
        )
      }
      {
      propertyArr.length > 0 ?
      (
        <Link className="cta" to={`${searchPath}/results`} onClick={buildSearch}>Search</Link>
      ) :
      (
        <>
          {`Select at least one property to filter.`}
        </>
      )
    }
    </>
  )
};

function FilterSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();

  const [filterTargetsArr, setfilterTargetsArr] = useState([]);

  const filterTargets = [{"name": `Filter by ${CapitalCase(data.overviewData.ling0_name)}`, "id": "lings"}, {"name": `Filter by ${CapitalCase(data.overviewData.ling0_name)} Property`, "id": "ling_properties"}];
  if (data.overviewData.depth_maximum > 0) {
    filterTargets.push(...[{"name": `Filter by ${CapitalCase(data.overviewData.ling1_name)}`, id: "linglets"}, {"name": `Filter by ${CapitalCase(data.overviewData.ling1_name)} Property`, "id": "linglet_properties"}]);
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

  return (
    <>
      <h2>Filter target</h2>
      <SelectTable data={filterTargets} columnMap={["name"]} selectArr={filterTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setfilterTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
      <Switch>
          <Route path={`${match.path}/lings`}>
            <FilterLingSearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
          <Route path={`${match.path}/ling_properties`}>
            <FilterLingPropertySearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
          <Route path={`${match.path}/linglets`}>
            <FilterLingletSearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
          <Route path={`${match.path}/linglet_properties`}>
            <FilterLingletPropertySearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
        </Switch>
    </>
  )
}

export default FilterSearch;
