import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

function Ling({ groupId }) {
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ ling_name: "", ling_properties: [] })

  const columnMap = {"name": "Property", "value": "Value"};

  let { lingId } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "groups/" + groupId + "/lings/" + lingId, { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then((data) => {
          setData(data);
          setReady(true);
        });
  }, [groupId, lingId]);

  if (!ready) return(<Loading />);

  return (
    <>
      <h1>{data.ling_name}</h1>
      <h2>Description</h2>
      <h2>Compare</h2>
      <h2>Properties</h2>
      {
        data.ling_properties.length === 0 ?
        (
          <h3>It doesn't look like there's anything here.</h3>
        ) :
        (
          <AlphaTable name={data.ling_name} data={data.ling_properties} columnMap={columnMap} link={(url, id) => { return "/groups/" + groupId + "/properties/" + id; }} />
        )
      }
    </>
  )
}

export default Ling;
