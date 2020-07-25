import React from 'react';

import Loading from '../shared/Loading';

import '../../css/shared/Table.css';
import '../../css/shared/SelectTable.css';

/*
  data - Set of data to be displayed as a table, must be an Array
  sort - Callback that allows for sorting of values, must take in two args
         and return 1 if the first is greater, and -1 otherwise
  selectArr - Array that contains all selected objects in table (extracted from data)
  columnMap - Array representing the columns in the table, along with their keys in data; the
              first element in the array (i.e. first column) is what will be alphabetically separated.
*/
function SelectTable({ data, sort, selectArr, setSelectArr, columnMap }) {
  if (data.length === 0) return (
    <Loading />
  );

  if (sort !== undefined) {
    data = data.sort(sort);
  }

  const toggle = (index, row) => {
    let newSelectArr = [...selectArr];

    if (index >= 0) newSelectArr.splice(index, 1);
    else newSelectArr.push(row);

    console.log(selectArr === newSelectArr);

    setSelectArr(newSelectArr);
  };

  return (
    <div className="card">
      { data.sort().map((row, i) => {
        let contains = false;

        let index = selectArr.indexOf(row);

        return (
          <React.Fragment key={i}>
            <div key={i} className={`select-row row row-${columnMap.length} ${index >= 0 ? "active" : ""}`} onClick={() => {toggle(index, row)}}>
              {
                columnMap.map((col, i) => {
                  return (
                    <span key={i} className="name">{row[col]}</span>
                  );
                })
              }

            </div>
            { data.length - i > 1 ?
              (
                <span className="h-divider" />
              ) :
              (
                null
              )
            }
          </React.Fragment>
        )
      }) }
    </div>
  )
}

export default SelectTable;
