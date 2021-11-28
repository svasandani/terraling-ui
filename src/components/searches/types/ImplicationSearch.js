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

function ImplicationSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();
  const history = useHistory();

  const [propertyArr, setPropertyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);

  const [valuesArr, setValuesArr] = useState([]);

  const buildSearch = (href) => {
    let searchData = {
      group: parseInt(data.id),
      property: {
        name: propertyArr[0].name,
        value: valueArr[0].name,
      },
    };

    setSearchData({
      href,
      data: searchData,
    });
  };

  const buildAntecedentSearch = () => {
    buildSearch("implication/antecedent");
  };
  const buildConsequentSearch = () => {
    buildSearch("implication/consequent");
  };
  const buildBothSearch = () => {
    buildSearch("implication/both");
  };

  let searchDirections = [
    {
      name: `Show properties that are implied when a ${CapitalCase(
        data.overviewData.ling0_name
      )} property has a specific value`,
      id: "antecedent",
    },
    {
      name: `Show properties that imply a ${CapitalCase(
        data.overviewData.ling0_name
      )} property has a specific value`,
      id: "consequent",
    },
    {
      name: `Show properties that occur if and only if a ${CapitalCase(
        data.overviewData.ling0_name
      )} property has a specific value`,
      id: "both",
    },
  ];

  const [searchDirectionsArr, setSearchDirectionsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefDirection = {};
    let oldid = "";

    if (searchDirections.length === 1) {
      history.push(`${match.url}/${searchDirections[0].id}`);
    }

    if (searchDirectionsArr.length === 1) {
      oldid = searchDirectionsArr[0].id;
    }

    searchDirections.forEach((direction) => {
      if (window.location.href.includes(direction.id)) {
        contains = true;
        if (oldid !== direction.id) {
          isNew = true;
          hrefDirection = direction;
        }
      }
    });

    if (isNew) setSearchDirectionsArr([hrefDirection]);
    else if (!contains && searchDirectionsArr.length > 0)
      setSearchDirectionsArr([]);
  }, [data, searchDirectionsArr]);

  useEffect(() => {
    if (propertyArr.length === 0) return;

    setValueArr([]);

    fetch(
      `${process.env.REACT_APP_API}groups/${data.id}/properties/${propertyArr[0].id}`,
      { headers: { accept: "application/json" } }
    )
      .then((response) => response.json())
      .then((data) => {
        data = data.property_lings
          .reduce((acc, curr) => {
            if (
              acc.findIndex((el) => el.name.trim() === curr.value.trim()) === -1
            )
              acc.push({ name: curr.value.trim() });
            return acc;
          }, [])
          .sort((a, b) => {
            return a.name.trim() > b.name.trim() ? 1 : -1;
          });
        setValuesArr(data);
      });
  }, [propertyArr]);

  return (
    <>
      <h2>Search direction</h2>
      <SelectTable
        data={searchDirections}
        columnMap={["name"]}
        selectArr={searchDirectionsArr}
        find={(el, row) => el.id === row.id}
        setSelectArr={setSearchDirectionsArr}
        maxSelect={1}
        link={(url, id) => {
          return url + "/" + id;
        }}
        replaceWithNew={true}
      />
      {searchDirectionsArr.length > 0 ? (
        <>
          <h2>
            Select a property{" "}
            <Link
              className="reset-btn"
              to="."
              onClick={(e) => reset(e, setPropertyArr)}
            >
              Reset
            </Link>
          </h2>
          <SelectTable
            data={data.lingPropertyData.concat(data.lingletPropertyData)}
            columnMap={["name"]}
            selectArr={propertyArr}
            setSelectArr={setPropertyArr}
            maxHeight="250px"
            maxSelect={1}
            replaceWithNew={true}
          />
          {propertyArr.length > 0 ? (
            <>
              <h2>
                Select a value{" "}
                <Link
                  className="reset-btn"
                  to="."
                  onClick={(e) => reset(e, setPropertyArr)}
                >
                  Reset
                </Link>
              </h2>
              <SelectTable
                data={valuesArr}
                columnMap={["name"]}
                selectArr={valueArr}
                setSelectArr={setValueArr}
                maxHeight="250px"
                maxSelect={1}
                replaceWithNew={true}
              />
            </>
          ) : null}
          <Divider />
        </>
      ) : null}
      <Switch>
        <Route path={`${match.path}/antecedent`}>
          <List
            data={
              propertyArr.length === 0 || valueArr.length === 0
                ? []
                : [
                    {
                      name_value: `${propertyArr[0].name} = “${valueArr[0].name}”`,
                    },
                  ]
            }
            field="name_value"
            heading={`Showing all properties that are present whenever:`}
          />
          {propertyArr.length === 0 || valueArr.length === 0 ? (
            <p>Select at least one property to search.</p>
          ) : (
            <Link
              className="cta"
              to={`${searchPath}/results`}
              onClick={buildAntecedentSearch}
            >
              Search
            </Link>
          )}
        </Route>
        <Route path={`${match.path}/consequent`}>
          <List
            data={
              propertyArr.length === 0 || valueArr.length === 0
                ? []
                : [
                    {
                      name_value: `${propertyArr[0].name} = “${valueArr[0].name}”`,
                    },
                  ]
            }
            field="name_value"
            heading={`Showing all properties that cause the following to be present:`}
          />
          {propertyArr.length === 0 || valueArr.length === 0 ? (
            <p>Select at least one property to search.</p>
          ) : (
            <Link
              className="cta"
              to={`${searchPath}/results`}
              onClick={buildConsequentSearch}
            >
              Search
            </Link>
          )}
        </Route>
        <Route path={`${match.path}/both`}>
          <List
            data={
              propertyArr.length === 0 || valueArr.length === 0
                ? []
                : [
                    {
                      name_value: `${propertyArr[0].name} = “${valueArr[0].name}”`,
                    },
                  ]
            }
            field="name_value"
            heading={`Showing all properties that are present if and only if:`}
          />
          {propertyArr.length === 0 || valueArr.length === 0 ? (
            <p>Select at least one property to search.</p>
          ) : (
            <Link
              className="cta"
              to={`${searchPath}/results`}
              onClick={buildBothSearch}
            >
              Search
            </Link>
          )}
        </Route>
      </Switch>
    </>
  );
}

export default ImplicationSearch;
