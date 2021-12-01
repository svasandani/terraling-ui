import React, { useState, useEffect } from "react";
import {
  Switch,
  Redirect,
  Route,
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import SelectTable from "../../shared/SelectTable";
import Divider from "../../shared/Divider";
import List from "../../shared/List";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

function SimilaritySearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();
  const history = useHistory();

  const [lingArr, setLingArr] = useState([]);
  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);

  const buildLingSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      lings: lingArr.map((ling) => parseInt(ling.id)),
      ling_properties: lingPropertyArr.map((property) => parseInt(property.id)),
    };

    setSearchData({
      href: "similarity/lings",
      data: searchData,
    });
  };

  const buildLingletSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      linglets: lingletArr.map((linglet) => parseInt(linglet.id)),
    };

    setSearchData({
      href: "similarity/linglets",
      data: searchData,
    });
  };

  let searchTargets = [
    {
      name: `Plot two or more ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )}`,
      id: "lings",
    },
  ];
  if (data.overviewData.depth_maximum > 0) {
    searchTargets.push({
      name: `Plot two or more ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )}`,
      id: "linglets",
    });
  }

  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = "";

    if (searchTargets.length === 1) {
      history.push(`${match.url}/${searchTargets[0].id}`);
    }

    if (searchTargetsArr.length === 1) {
      oldid = searchTargetsArr[0].id;
    }

    searchTargets.forEach((target) => {
      if (window.location.href.includes(target.id)) {
        contains = true;
        if (oldid !== target.id) {
          isNew = true;
          hrefTarget = target;
        }
      }
    });

    if (isNew) setSearchTargetsArr([hrefTarget]);
    else if (!contains && searchTargetsArr.length > 0) setSearchTargetsArr([]);
  }, [data, searchTargetsArr]);

  return (
    <>
      <h2>Search target</h2>
      <SelectTable
        data={searchTargets}
        columnMap={["name"]}
        selectArr={searchTargetsArr}
        find={(el, row) => el.id === row.id}
        setSelectArr={setSearchTargetsArr}
        maxSelect={1}
        link={(url, id) => {
          return url + "/" + id;
        }}
        replaceWithNew={true}
      />
      <Switch>
        <Route path={`${match.path}/lings`}>
          <h2>
            {CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}{" "}
            <Link
              className="reset-btn"
              to="."
              onClick={(e) => {
                e.preventDefault();
                setLingArr(data.lingData);
              }}
            >
              Select all
            </Link>{" "}
            <Link
              className="reset-btn"
              to="."
              onClick={(e) => reset(e, setLingArr)}
            >
              Reset
            </Link>
          </h2>
          <SelectTable
            data={data.lingData}
            columnMap={["name"]}
            selectArr={lingArr}
            setSelectArr={setLingArr}
            maxHeight="250px"
            maxSelect={-1}
          />
          <Divider />
          <List
            data={lingArr}
            field="name"
            heading={`Comparing ${lingArr.length} ${CapitalCase(
              TargetToPlural(lingArr.length, data.overviewData.ling0_name)
            )}:`}
          />
          <List
            data={lingPropertyArr}
            field="name"
            heading={`Showing ${lingPropertyArr.length} propert${
              lingPropertyArr.length === 1 ? "y" : "ies"
            }:`}
          />
          {lingArr.length <= 1 ? (
            <p>
              Select at least two{" "}
              {CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} to
              plot.
            </p>
          ) : (
            <Link
              className="cta"
              to={`${searchPath}/results`}
              onClick={buildLingSearch}
            >
              Search
            </Link>
          )}
        </Route>
        <Route path={`${match.path}/linglets`}>
          {data.overviewData.depth_maximum > 0 ? (
            <>
              <h2>
                {CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}{" "}
                <Link
                  className="reset-btn"
                  to="."
                  onClick={(e) => {
                    e.preventDefault();
                    setLingletArr(data.lingletData);
                  }}
                >
                  Select all
                </Link>{" "}
                <Link
                  className="reset-btn"
                  to="."
                  onClick={(e) => reset(e, setLingletArr)}
                >
                  Reset
                </Link>
              </h2>
              <SelectTable
                data={data.lingletData}
                columnMap={["name"]}
                selectArr={lingletArr}
                setSelectArr={setLingletArr}
                maxHeight="250px"
                maxSelect={-1}
              />
              <Divider />
              <List
                data={lingletArr}
                field="name"
                heading={`Comparing ${lingletArr.length} ${CapitalCase(
                  TargetToPlural(
                    lingletArr.length,
                    data.overviewData.ling1_name
                  )
                )}:`}
              />
              {lingletArr.length <= 1 ? (
                <p>
                  Select at least two{" "}
                  {CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}{" "}
                  to plot.
                </p>
              ) : (
                <Link
                  className="cta"
                  to={`${searchPath}/results`}
                  onClick={buildLingletSearch}
                >
                  Search
                </Link>
              )}
            </>
          ) : (
            <Redirect to="lings" />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default SimilaritySearch;
