import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import FilterResults from './results/FilterResults';
import CompareResults from './results/CompareResults';
import CrossResults from './results/CrossResults';

import Loading from '../shared/Loading';

function SearchResults({ data, groupId, searchData }) {
  const [ready, setReady] = useState(false);

  const [resultData, setResultData] = useState({})

  useEffect(() => {
    if (Object.keys(searchData).length === 0) return;

    fetch(process.env.REACT_APP_API + "groups/" + groupId + "/searches/get_results", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(searchData)
    }).then(response => response.json())
      .then((resultData) => {
        setResultData(resultData);
        setReady(true);
      });
  }, [groupId]);

  if (!ready && Object.keys(searchData).length === 0) {
    let localResults = JSON.parse(localStorage.getItem('resultData'));
    if (!localResults || Object.keys(localResults).length === 0) {
      return (
        <Redirect to={`/groups/${groupId}/searches/new`} />
      )
    } else {
      setResultData(localResults);
      setReady(true);
    }
  } else if (!ready) {
    localStorage.setItem('resultData', JSON.stringify(resultData));
  }

  if (!ready) return(<Loading />);

  if (resultData.type === "default") {
    return (
      <FilterResults data={data} resultData={resultData} />
    )
  } else if (resultData.type === "compare") {
    return (
      <CompareResults data={data} resultData={resultData} />
    )
  } else if (resultData.type === "cross") {
    return (
      <CrossResults data={data} resultData={resultData} />
    )
  } else {
    return (
      <>
        <h1>Search Results</h1>
        {
          resultData.errors ?
          (
            <h2>{resultData.errors}</h2>
          ) :
          (
            <h2>Something went wrong. Please try again.</h2>
          )
        }
      </>
    )
  }
}

export default SearchResults;
