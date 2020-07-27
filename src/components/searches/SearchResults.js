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

  if (resultData.type === "compare") {
    return (
      <>
        <h1>Search Results</h1>
        <CompareResults data={data} resultData={resultData} />
      </>
    )
  } else {
    return (
      <>
        <h1>Search Results</h1>
        <h3>Something went wrong. Please try again.</h3>
      </>
    )
  }
}

export default SearchResults;
