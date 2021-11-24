import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import SelectTable from "../../shared/SelectTable";
import Divider from "../../shared/Divider";
import List from "../../shared/List";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

const FilterLingSearch = ({ data, reset, setSearchData, searchPath }) => {
  const [lingArr, setLingArr] = useState([]);
  const [lingPropertyArr, setLingPropertyArr] = useState([]);
  const [lingPropertyInclusivity, setLingPropertyInclusivity] = useState([
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )} that have ANY of these properties`,
      id: "false",
    },
  ]);
  const propertyInclusivityData = [
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )} that have ANY of these properties`,
      id: "false",
    },
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )} that have ALL of these properties`,
      id: "true",
    },
  ];

  const buildSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      lings: lingArr.map((ling) => parseInt(ling.id)),
    };

    if (lingPropertyArr.length > 0) {
      searchData.ling_properties = lingPropertyArr.map((property) =>
        parseInt(property.id)
      );
      searchData.ling_properties_inclusive =
        lingPropertyInclusivity[0].id === "true";
    }

    setSearchData({
      href: "filter/lings",
      data: searchData,
    });
  };

  return (
    <>
      <h2>
        {CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}{" "}
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
        maxSelect={-1}
        maxHeight="250px"
      />
      <h2>
        {CapitalCase(data.overviewData.ling0_name) + " properties to display"}{" "}
        (defaults to all){" "}
        <Link
          className="reset-btn"
          to="."
          onClick={(e) => reset(e, setLingPropertyArr)}
        >
          Reset
        </Link>
      </h2>
      <SelectTable
        data={data.lingPropertyData}
        columnMap={["name"]}
        selectArr={lingPropertyArr}
        setSelectArr={setLingPropertyArr}
        maxSelect={-1}
        maxHeight="250px"
      />
      {lingPropertyArr.length > 0 ? (
        <>
          <h2>
            {CapitalCase(data.overviewData.ling0_name) +
              " property inclusivity"}
          </h2>
          <SelectTable
            data={propertyInclusivityData}
            columnMap={["name"]}
            selectArr={lingPropertyInclusivity}
            setSelectArr={setLingPropertyInclusivity}
            maxHeight="250px"
            maxSelect={1}
            replaceWithNew={true}
          />
        </>
      ) : null}
      <Divider />
      <List
        data={lingArr}
        field="name"
        heading={`Filtering by ${lingArr.length} ${CapitalCase(
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
      {lingArr.length <= 0 ? (
        <p>
          Select at least one {CapitalCase(data.overviewData.ling0_name)} to
          filter by.
        </p>
      ) : (
        <Link
          className="cta"
          to={`${searchPath}/results`}
          onClick={buildSearch}
        >
          Search
        </Link>
      )}
    </>
  );
};
const FilterLingPropertySearch = ({
  data,
  reset,
  setSearchData,
  searchPath,
}) => {
  const [propertyArr, setPropertyArr] = useState([]);
  const [lingArr, setLingArr] = useState([]);
  const [lingInclusivity, setLingInclusivity] = useState([
    {
      name: `Find properties that have ANY of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )}`,
      id: "false",
    },
  ]);
  const lingInclusivityData = [
    {
      name: `Find properties that have ANY of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )}`,
      id: "false",
    },
    {
      name: `Find properties that have ALL of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling0_name)
      )}`,
      id: "true",
    },
  ];

  const buildSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      ling_properties: propertyArr.map((property) => parseInt(property.id)),
    };

    if (lingArr.length > 0) {
      searchData.lings = lingArr.map((ling) => parseInt(ling.id));
      searchData.lings_inclusive = lingInclusivity[0].id === "true";
    }

    setSearchData({
      href: "filter/ling_properties",
      data: searchData,
    });
  };

  return (
    <>
      <h2>
        {CapitalCase(data.overviewData.ling0_name) + " properties"}{" "}
        <Link
          className="reset-btn"
          to="."
          onClick={(e) => reset(e, setPropertyArr)}
        >
          Reset
        </Link>
      </h2>
      <SelectTable
        data={data.lingPropertyData}
        columnMap={["name"]}
        selectArr={propertyArr}
        setSelectArr={setPropertyArr}
        maxSelect={-1}
        maxHeight="250px"
      />
      <h2>
        {`${CapitalCase(
          TargetToPlural(2, data.overviewData.ling0_name)
        )} to display`}{" "}
        (defaults to all){" "}
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
        maxSelect={-1}
        maxHeight="250px"
      />
      {lingArr.length > 0 ? (
        <>
          <h2>{CapitalCase(data.overviewData.ling0_name) + " inclusivity"}</h2>
          <SelectTable
            data={lingInclusivityData}
            columnMap={["name"]}
            selectArr={lingInclusivity}
            setSelectArr={setLingInclusivity}
            maxHeight="250px"
            maxSelect={1}
            replaceWithNew={true}
          />
        </>
      ) : null}
      <Divider />
      <List
        data={propertyArr}
        field="name"
        heading={`Filtering by ${propertyArr.length} propert${
          propertyArr.length === 1 ? "y" : "ies"
        }:`}
      />
      <List
        data={lingArr}
        field="name"
        heading={`Showing ${lingArr.length} ${CapitalCase(
          TargetToPlural(lingArr.length, data.overviewData.ling0_name)
        )}:`}
      />
      {propertyArr.length <= 0 ? (
        <p>Select at least one property to filter by.</p>
      ) : (
        <Link
          className="cta"
          to={`${searchPath}/results`}
          onClick={buildSearch}
        >
          Search
        </Link>
      )}
    </>
  );
};
const FilterLingletSearch = ({ data, reset, setSearchData, searchPath }) => {
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletPropertyArr, setLingletPropertyArr] = useState([]);
  const [lingletPropertyInclusivity, setLingletPropertyInclusivity] = useState([
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )} that have ANY of these properties`,
      id: "false",
    },
  ]);
  const propertyInclusivityData = [
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )} that have ANY of these properties`,
      id: "false",
    },
    {
      name: `Find ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )} that have ALL of these properties`,
      id: "true",
    },
  ];

  const buildSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      linglets: lingletArr.map((linglet) => parseInt(linglet.id)),
    };

    if (lingletPropertyArr.length > 0) {
      searchData.linglet_properties = lingletPropertyArr.map((property) =>
        parseInt(property.id)
      );
      searchData.linglet_properties_inclusive =
        lingletPropertyInclusivity[0].id === "true";
    }

    setSearchData({
      href: "filter/linglets",
      data: searchData,
    });
  };

  return (
    <>
      <h2>
        {CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))}{" "}
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
        maxSelect={-1}
        maxHeight="250px"
      />
      <h2>
        {CapitalCase(data.overviewData.ling1_name) + " properties to display"}{" "}
        (defaults to all){" "}
        <Link
          className="reset-btn"
          to="."
          onClick={(e) => reset(e, setLingletPropertyArr)}
        >
          Reset
        </Link>
      </h2>
      <SelectTable
        data={data.lingletPropertyData}
        columnMap={["name"]}
        selectArr={lingletPropertyArr}
        setSelectArr={setLingletPropertyArr}
        maxSelect={-1}
        maxHeight="250px"
      />
      {lingletPropertyArr.length > 0 ? (
        <>
          <h2>
            {CapitalCase(data.overviewData.ling1_name) +
              " property inclusivity"}
          </h2>
          <SelectTable
            data={propertyInclusivityData}
            columnMap={["name"]}
            selectArr={lingletPropertyInclusivity}
            setSelectArr={setLingletPropertyInclusivity}
            maxHeight="250px"
            maxSelect={1}
            replaceWithNew={true}
          />
        </>
      ) : null}
      <Divider />
      <List
        data={lingletArr}
        field="name"
        heading={`Filtering by ${lingletArr.length} ${CapitalCase(
          TargetToPlural(lingletArr.length, data.overviewData.ling1_name)
        )}:`}
      />
      <List
        data={lingletPropertyArr}
        field="name"
        heading={`Showing ${lingletPropertyArr.length} propert${
          lingletPropertyArr.length === 1 ? "y" : "ies"
        }:`}
      />
      {lingletArr.length <= 0 ? (
        <p>
          Select at least one {CapitalCase(data.overviewData.ling1_name)} to
          filter by.
        </p>
      ) : (
        <Link
          className="cta"
          to={`${searchPath}/results`}
          onClick={buildSearch}
        >
          Search
        </Link>
      )}
    </>
  );
};
const FilterLingletPropertySearch = ({
  data,
  reset,
  setSearchData,
  searchPath,
}) => {
  const [propertyArr, setPropertyArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [lingletInclusivity, setLingletInclusivity] = useState([
    {
      name: `Find properties that have ANY of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )}`,
      id: "false",
    },
  ]);
  const lingletInclusivityData = [
    {
      name: `Find properties that have ANY of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )}`,
      id: "false",
    },
    {
      name: `Find properties that have ALL of these ${CapitalCase(
        TargetToPlural(2, data.overviewData.ling1_name)
      )}`,
      id: "true",
    },
  ];

  const buildSearch = () => {
    let searchData = {
      group: parseInt(data.id),
      linglet_properties: propertyArr.map((property) => parseInt(property.id)),
    };

    if (lingletArr.length > 0) {
      searchData.linglets = lingletArr.map((linglet) => parseInt(linglet.id));
      searchData.linglets_inclusive = lingletInclusivity[0].id === "true";
    }

    setSearchData({
      href: "filter/linglet_properties",
      data: searchData,
    });
  };

  return (
    <>
      <h2>
        {CapitalCase(data.overviewData.ling1_name) + " properties"}{" "}
        <Link
          className="reset-btn"
          to="."
          onClick={(e) => reset(e, setPropertyArr)}
        >
          Reset
        </Link>
      </h2>
      <SelectTable
        data={data.lingletPropertyData}
        columnMap={["name"]}
        selectArr={propertyArr}
        setSelectArr={setPropertyArr}
        maxSelect={-1}
        maxHeight="250px"
      />
      <h2>
        {`${CapitalCase(
          TargetToPlural(2, data.overviewData.ling1_name)
        )} to display`}{" "}
        (defaults to all){" "}
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
        maxSelect={-1}
        maxHeight="250px"
      />
      {lingletArr.length > 0 ? (
        <>
          <h2>{CapitalCase(data.overviewData.ling1_name) + " inclusivity"}</h2>
          <SelectTable
            data={lingletInclusivityData}
            columnMap={["name"]}
            selectArr={lingletInclusivity}
            setSelectArr={setLingletInclusivity}
            maxHeight="250px"
            maxSelect={1}
            replaceWithNew={true}
          />
        </>
      ) : null}
      <Divider />
      <List
        data={propertyArr}
        field="name"
        heading={`Filtering by ${propertyArr.length} propert${
          propertyArr.length === 1 ? "y" : "ies"
        }:`}
      />
      <List
        data={lingletArr}
        field="name"
        heading={`Showing ${lingletArr.length} ${CapitalCase(
          TargetToPlural(lingletArr.length, data.overviewData.ling1_name)
        )}:`}
      />
      {propertyArr.length <= 0 ? (
        <p>Select at least one property to filter by.</p>
      ) : (
        <Link
          className="cta"
          to={`${searchPath}/results`}
          onClick={buildSearch}
        >
          Search
        </Link>
      )}
    </>
  );
};

function FilterSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();

  const searchTargets = [
    {
      name: `Filter by ${CapitalCase(data.overviewData.ling0_name)}`,
      id: "lings",
    },
    {
      name: `Filter by ${CapitalCase(data.overviewData.ling0_name)} property`,
      id: "ling_properties",
    },
  ];
  if (data.overviewData.depth_maximum > 0) {
    searchTargets.push(
      ...[
        {
          name: `Filter by ${CapitalCase(data.overviewData.ling1_name)}`,
          id: "linglets",
        },
        {
          name: `Filter by ${CapitalCase(
            data.overviewData.ling1_name
          )} property`,
          id: "linglet_properties",
        },
      ]
    );
  }

  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = "";

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
  }, [window.location.href, searchTargetsArr]);

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
          <FilterLingSearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/ling_properties`}>
          <FilterLingPropertySearch
            data={data}
            reset={reset}
            setSearchData={setSearchData}
            searchPath={searchPath}
          />
        </Route>
        <Route path={`${match.path}/linglets`}>
          {data.overviewData.depth_maximum > 0 ? (
            <FilterLingletSearch
              data={data}
              reset={reset}
              setSearchData={setSearchData}
              searchPath={searchPath}
            />
          ) : null}
        </Route>
        <Route path={`${match.path}/linglet_properties`}>
          {data.overviewData.depth_maximum > 0 ? (
            <FilterLingletPropertySearch
              data={data}
              reset={reset}
              setSearchData={setSearchData}
              searchPath={searchPath}
            />
          ) : null}
        </Route>
      </Switch>
    </>
  );
}

export default FilterSearch;
