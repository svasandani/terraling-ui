import React from 'react';
import '../../css/landing/Feed.css';

import Groups from './Groups';
import Activity from './Activity';

function Feed({ user }) {

  return (
    <div className="container">
      <Groups user={user} />
      <Activity user={user} />
    </div>
  )
}

export default Feed;
