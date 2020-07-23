import React from 'react';

function Table({ rows, cols, data, rowBuilder }) {
  return (
    {for (let i = 0; i < rows; i++) {
      (
        rowBuilder(data[i]);
      )
    }}
  )
}
