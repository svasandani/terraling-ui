import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Loading from '../shared/Loading';

import '../../css/shared/AlphaTable.css';

/*
  data - Set of data to be displayed as a table, must be an Array
  sort - Callback that allows for sorting of values, must take in two args
         and return 1 if the first is greater, and -1 otherwise
  link - Callback that allows for custom linking, must take in two args (current URL and row ID)
         and return the link to direct the user to, defaults to match.url + "/" + row.ID
  columnMap - Array/object representing the columns in the table, along with their keys in data; the
              first element in the array (i.e. first column) is what will be alphabetically separated.
              If it is an array, the table will have no headers. If it is an object, the keys represent
              the data keys, and the values represent the name of the header.
*/
function AlphaTable({ data, sort, link, columnMap }) {
  let keys = [];
  let headers = false;

  if (Array.isArray(columnMap)) {
    keys = columnMap;
  } else {
    keys = Object.keys(columnMap);
    headers = true;
  }

  let match = useRouteMatch();

  const [filter, setFilter] = useState("");

  if (data.length === 0) return (
    <Loading />
  );

  if (sort !== undefined) {
    data = data.sort(sort);
  }

  if (link === undefined) {
    link = (url, id) => { return url + "/" + id; }
  }

  let dataReduce = {};
  data.reduce((acc, row) => {
    if (row[keys[0]] === undefined || row[keys[0]] === "") return null;
    else {
      let firstLetter = row[keys[0]].trim().charAt(0).toLocaleUpperCase();

      // if (!isLetter(firstLetter)) firstLetter = "*";

      if (!dataReduce[firstLetter]) dataReduce[firstLetter] = [row];
      else dataReduce[firstLetter].push(row);
    }

    return null;
  }, {});

  const filterBy = (e, letter) => {
    e.preventDefault();
    setFilter(letter);
  }

  return (
    <>
      <div className="card filter">
        <a href="#container" onClick={(e) => { filterBy(e, "") }}>ALL</a>
        { Object.keys(dataReduce).map(letter => {
          return (
            <a key={letter} href="#container" onClick={(e) => { filterBy(e, letter) }}>{letter}</a>
          )
        })}
      </div>
      { Object.keys(dataReduce).map(letter => {
        if (filter.length > 0 && filter !== letter) return null;

        return (
          <div key={letter} className="letter">
            <h3>{letter}</h3>
            <div className="card">
              {
                headers ?
                (
                  <>
                    <div className={`headers row row-${keys.length}`}>
                      {
                        keys.map((col, i) => {
                          return (
                            <span key={i} className="header name">{columnMap[col]}</span>
                          )
                        })
                      }
                    </div>
                    <span className="h-divider" />
                  </>
                ) :
                (
                  null
                )
              }
              { dataReduce[letter].sort().map((row, i) => {
                return (
                  <React.Fragment key={i}>
                    <div key={i} className={`row row-${keys.length}`}>
                      {
                        keys.map((col, i) => {
                          if (i === 0) return (
                            <span key={i} className="name"><Link to={link(match.url, row.id)}>{row[col]}</Link></span>
                          ); else return (
                            <span key={i} className="name">{row[col]}</span>
                          );
                        })
                      }

                    </div>
                    { dataReduce[letter].length - i > 1 ?
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
          </div>
        )
      }) }
    </>
  );
}

export default AlphaTable;
