import React from 'react';

function ConditionalReload() {
  if (process.env.REACT_APP_RELOAD != 'FALSE')
    window.location.reload();

  return (
    <></>
  );
}

export default ConditionalReload;
