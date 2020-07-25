import React from 'react';

import '../../css/shared/Loading.css';
import loading from '../../img/loading.svg';

function Loading() {
  return (
    <div className="loading">
      <h1 className="ellipsis">Hold on</h1>
      <img src={loading} alt="A person turning several gears." />
      <h2>We're crunching the numbers.</h2>
    </div>
  )
}

export default Loading;
