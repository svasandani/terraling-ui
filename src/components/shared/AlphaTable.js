import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import '../../css/shared/AlphaTable.css';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function AlphaTable({ data, name }) {
  let match = useRouteMatch();

  const [filter, setFilter] = useState("");

  let dataReduce = {};
  data.reduce((acc, row) => {
    if (row.name === undefined || row.name === "") return;
    else {
      let firstLetter = row.name.charAt(0).toLocaleUpperCase();

      // if (!isLetter(firstLetter)) firstLetter = "*";

      if (!dataReduce[firstLetter]) dataReduce[firstLetter] = [row];
      else dataReduce[firstLetter].push(row);
    }
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
          { Object.keys(dataReduce).sort().map(letter => {
            return (
              <a key={letter} href="#container" onClick={(e) => { filterBy(e, letter) }}>{letter}</a>
            )
          })}
        </div>
        { Object.keys(dataReduce).sort().map(letter => {
          if (filter.length > 0 && filter !== letter) return null;

          return (
            <div key={letter} className="letter">
              <h2>{letter}</h2>
              <div className="card">
                { dataReduce[letter].map((row, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div key={i} className="row">
                        <Link to={match.url + "/" + row.id}><span className="name">{row.name}</span></Link>
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
