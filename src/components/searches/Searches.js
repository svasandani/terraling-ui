import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function Searches() {
  let match = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${match.path}/preview`}>
        <SearchResults />
      </Route>
      <Route path={match.path}>
        <SearchForm />
      </Route>
    </Switch>
  )
}

export default Searches;
