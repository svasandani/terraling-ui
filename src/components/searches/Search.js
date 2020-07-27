import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function Search({ groupId, data }) {
  let match = useRouteMatch();

  const [searchData, setSearchData] = useState({});

  // useEffect(() => {
  //   console.log("wow");
  // }, [searchData])

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <SearchForm data={data} searchPath={match.url} searchData={searchData} setSearchData={setSearchData} />
      </Route>
      <Route path={`${match.path}/results`}>
        <SearchResults groupId={groupId} searchData={searchData} />
      </Route>
      <Route path={`${match.path}`}>
        <Redirect to="new" />
      </Route>
    </Switch>
  )
}

export default Search;
