import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

function Property({ groupId }) {
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ property_name: "", property_lings: [] });

  const nameSort = (a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1; };

  const columnMap = {"name": "Language", "value": "Value"};

  let { propertyId } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "groups/" + groupId + "/properties/" + propertyId, { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then((data) => {
          setData(data);
          setReady(true);
        });
  }, [groupId, propertyId]);

  if (!ready) return(<Loading />);

  return (
    <>
      <h1>{data.property_name}</h1>
      <h2>Description</h2>
      <h2>Compare</h2>
      <h2>Properties</h2>
      {
        data.property_lings.length === 0 ?
        (
          <h3>It doesn't look like there's anything here.</h3>
        ) :
        (
          <AlphaTable name={data.property_name} sort={nameSort} data={data.property_lings} columnMap={columnMap} link={(url, id) => { return "/groups/" + groupId + "/" + (data.property_depth === 0 ? "lings" : "linglets") + "/" + id; }} />
        )
      }
    </>
  )
}

export default Property;
