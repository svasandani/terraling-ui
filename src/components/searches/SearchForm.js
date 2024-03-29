import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import SelectTable from "../shared/SelectTable";

import FilterSearch from "./types/FilterSearch";
import CompareSearch from "./types/CompareSearch";
import CrossSearch from "./types/CrossSearch";
import ImplicationSearch from "./types/ImplicationSearch";
import SimilaritySearch from "./types/SimilaritySearch";

import "../../css/searches/SearchForm.css";

function SearchForm({ data, searchPath, searchData, setSearchData }) {
  let match = useRouteMatch();

  const [searchTypesArr, setSearchTypesArr] = useState([]);

  const reset = (e, f) => {
    e.preventDefault();
    f([]);
  };

  const searchTypes = [
    { name: "Filter", id: "filter" },
    { name: "Compare", id: "compare" },
    { name: "Cross", id: "cross" },
    { name: "Implication", id: "implication" },
    { name: "Similarity", id: "similarity" },
  ];

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefType = {};
    let oldid = "";

    if (searchTypesArr.length === 1) {
      oldid = searchTypesArr[0].id;
    }

    searchTypes.forEach((type) => {
      if (window.location.href.includes(type.id)) {
        contains = true;
        if (oldid !== type.id) {
          isNew = true;
          hrefType = type;
        }
      }
    });

    if (isNew) setSearchTypesArr([hrefType]);
    else if (!contains && searchTypesArr.length > 0) setSearchTypesArr([]);

    if (Object.keys(searchData).length > 0) setSearchData({});
  }, [window.location.href, searchTypesArr, searchData]);

  return (
    <>
      <h1>Search</h1>
      <h2>Search type</h2>
      <SelectTable
        data={searchTypes}
        columnMap={["name"]}
        selectArr={searchTypesArr}
        find={(el, row) => el.id === row.id}
        setSelectArr={setSearchTypesArr}
        maxSelect={1}
        link={(url, id) => {
          return url + "/" + id;
        }}
        replaceWithNew={true}
      />
      <Switch>
        <Route path={`${match.path}/filter`}>
          <FilterSearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/compare`}>
          <CompareSearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/cross`}>
          <CrossSearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/implication`}>
          <ImplicationSearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/similarity`}>
          <SimilaritySearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
      </Switch>
    </>
  );
}

export default SearchForm;
