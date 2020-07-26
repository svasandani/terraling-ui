import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Loading from '../shared/Loading';

import '../../css/shared/Table.css';
import '../../css/shared/SelectTable.css';

/*
  data - Set of data to be displayed as a table, must be an Array
  sort - Callback that allows for sorting of values, must take in two args
         and return 1 if the first is greater, and -1 otherwise
  link - Callback that allows for custom linking, must take in two args (current URL and row ID)
         and return the link to direct the user to, defaults to match.url + "/" + row.ID
  find - Callback that allows for custom find methods (defaults to checking name prop)
  selectArr - Array that contains all selected objects in table (extracted from data)
  setSelectArr - State setter for selectArr
  maxSelect - Max number of selections to permit
  columnMap - Array representing the columns in the table, along with their keys in data; the
              first element in the array (i.e. first column) is what will be alphabetically separated.
  maxHeight - Max height in px of card
  disabled - Whether to gray out card
  replaceWithNew - Replace old values with new values, or simply stop any more selections
*/
function SelectTable({ data, sort, link, find, selectArr, setSelectArr, maxSelect=6, columnMap, maxHeight, disabled, replaceWithNew }) {
  let match = useRouteMatch();

  if (data.length === 0) return (
    <Loading />
  );

  if (sort !== undefined) {
    data = data.sort(sort);
  }

  if (find === undefined) {
    find = (el, row) => el.name === row.name
  }

  const toggle = (index, row) => {
    if (disabled) return;

    let newSelectArr = [...selectArr];

    if (index >= 0) newSelectArr.splice(index, 1);
    else if (selectArr.length < maxSelect) newSelectArr.push(row);
    else {
      if (replaceWithNew) {
        newSelectArr.shift();
        newSelectArr.push(row);
      }
    }

    setSelectArr(newSelectArr);
  };

  return (
    <div className={`card ${disabled ? "disabled" : ""}`} style={{ "maxHeight": maxHeight ? maxHeight : "auto", "overflowY": maxHeight ? "scroll" : "visible" }} >
      { data.map((row, i) => {
        let index = selectArr.findIndex((el) => { return find(el, row); });

        return (
          <React.Fragment key={i}>
            { link ?
              (
                <Link to={link(match.url, row.id)}>
                  <div key={i} className={`select-row row row-${columnMap.length} ${index >= 0 ? "active" : ""}`} onClick={() => {toggle(index, row)}}>
                    {
                      columnMap.map((col, i) => {
                        return (
                          <span key={i} className="name">{row[col]}</span>
                        );
                      })
                    }

                  </div>
                </Link>
              ) :
              (
                <div key={i} className={`select-row row row-${columnMap.length} ${index >= 0 ? "active" : ""}`} onClick={() => {toggle(index, row)}}>
                  {
                    columnMap.map((col, i) => {
                      return (
                        <span key={i} className="name">{row[col]}</span>
                      );
                    })
                  }

                </div>
              )
            }
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
