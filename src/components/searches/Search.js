import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function Search({ data }) {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <SearchForm data={data} />
      </Route>
      <Route path={`${match.path}/results`}>
        <SearchResults />
      </Route>
      <Route path={`${match.path}`}>
        <h1>Hi</h1>
      </Route>
    </Switch>
  )
}

export default Search;
