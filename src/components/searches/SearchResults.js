import React, { useState, useEffect } from 'react';

import CompareResults from './results/CompareResults';

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

  if (!ready) return(<Loading />);

  return (
    <>
      <h1>{data.ling_name}</h1>
      <h2>Description</h2>
      <h2>Compare</h2>
      <h2>Properties</h2>
      {
        true ?
        (
          <h3>It doesn't look like there's anything here.</h3>
        ) :
        (
          <div />
        )
      }
    </>
  )
}

export default SearchResults;
