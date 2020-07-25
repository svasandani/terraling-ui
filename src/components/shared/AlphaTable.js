import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import '../../css/shared/AlphaTable.css';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

/*
  data - Set of data to be displayed as a table, must be an Array
  name - Name of dataset, displayed above table as h1
  sort - Callback that allows for sorting of values, must take in two args
         and return 1 if the first is greater, and -1 otherwise
  link - Callback that allows for custom linking, must take in two args (current URL and row ID)
         and return the link to direct the user to, defaults to match.url + "/" + row.ID
*/
function AlphaTable({ data, name, sort, link }) {
  let match = useRouteMatch();

  const [filter, setFilter] = useState("");

  if (data.length == 0) return (
    <main>
      <section id="container">
        <h1>Sorry, nothing to display.</h1>
      </section>
    </main>
  );

  if (sort !== undefined) {
    data = data.sort(sort);
  }

  if (link === undefined) {
    link = (url, id) => { return url + "/" + id; }
  }

  let dataReduce = {};
  data.reduce((acc, row) => {
    if (row.name === undefined || row.name === "") return null;
    else {
      let firstLetter = row.name.trim().charAt(0).toLocaleUpperCase();

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
    <main>
      <section id="container">
        <h1>{CapitalCase(TargetToPlural(2, name))}</h1>
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
              <h2>{letter}</h2>
              <div className="card">
                { dataReduce[letter].sort().map((row, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div key={i} className="row">
                        <Link to={link(match.url, row.id)}><span className="name">{row.name}</span></Link>
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
      </section>
    </main>
  );
}

export default AlphaTable;
