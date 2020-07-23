import React, { useState, useEffect } from 'react';
import '../../css/landing/Feed.css';

import Groups from './Groups';

function Feed({ user }) {

  return (
    <div className="container">
      <Groups user={user} />
      <div />
    </div>
  )
}

export default Feed;
