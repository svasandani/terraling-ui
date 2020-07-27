import React, { useState, useEffect } from 'react';

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

function SearchResults({ groupId, searchData }) {
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({})

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "groups/" + groupId + "/searches/get_results", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(searchData)
    }).then(response => response.json())
      .then((data) => {
        setData(data);
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
