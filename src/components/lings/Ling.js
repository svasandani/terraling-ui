import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

function Ling({ groupId }) {
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ ling_name: "", ling_properties: [] })

  const columnMap = {"property_name": "Property", "value": "Value"};

  let { lingId } = useParams();

  useEffect(() => {
    fetch("http://192.168.0.19:4000/groups/" + groupId + "/lings/" + lingId, { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then((data) => {
          setData(data);
          setReady(true);
        });
  }, [groupId, lingId]);

  if (!ready) return(<Loading />);

  console.log(data);

  return (
    <>
      <h1>{data.ling_name}</h1>
      <h2>Description</h2>
      <h2>Compare</h2>
      <h2>Properties</h2>
      <AlphaTable name={data.ling_name} data={data.ling_properties} columnMap={columnMap} />
    </>
  )
}

export default Ling;
