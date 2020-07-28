import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/lings/Ling.css';

import AlphaTable from '../shared/AlphaTable';

import Loading from '../shared/Loading';

function Ling({ groupId }) {
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({ ling_name: "", ling_properties: [] });

  const [mapData, setMapData] = useState("");

  const nameSort = (a, b) => { return a.name.trim() > b.name.trim() ? 1 : -1; };

  const findLatLong = (data) => {
    let obj = data.find(el => { return el.name === "latlong"; });

    if (obj) {
      setMapData(obj.value);
      return;
    }

    obj = data.find(el => { return el.name === "z_latlong"; });

    if (obj) {
      setMapData(obj.value);
      return;
    }
  }

  const columnMap = {"name": "Property", "value": "Value"};

  let { lingId } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "groups/" + groupId + "/lings/" + lingId, { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then((data) => {
          findLatLong(data.ling_properties);
          setData(data);
          setReady(true);
        });
  }, [groupId, lingId]);

  if (!ready) return(<Loading />);

  return (
    <>
      <h1>{data.ling_name}</h1>
      <h2>Location</h2>
      {
        mapData.length > 0 ?
        (
          <iframe className="map-view" frameBorder="0" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBZaw41SaE7YNrtWyWDwmlVguPmbx23x1o&zoom=3&center=${mapData}&q=${mapData}`} />
        ) :
        (
          <h3 className="no-map-data">We don't have map data for {data.ling_name} yet.</h3>
        )
      }
      <h2>Description</h2>
      <h2>Compare</h2>
      <h2>Properties</h2>
      {
        data.ling_properties.length === 0 ?
        (
          <h3>It doesn't look like there's anything here.</h3>
        ) :
        (
          <AlphaTable name={data.ling_name} sort={nameSort} data={data.ling_properties} columnMap={columnMap} link={(url, id) => { return "/groups/" + groupId + "/properties/" + id; }} />
        )
      }
    </>
  )
}

export default Ling;
