import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/groups/GroupLings.css';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function GroupLings({ lingData, lingName }) {
  const [filter, setFilter] = useState("");

  let lingReduce = {};
  lingData.reduce((acc, ling) => {
    if (ling.name === undefined || ling.name === "") return;
    else {
      let firstLetter = ling.name.charAt(0).toLocaleUpperCase();

      // if (!isLetter(firstLetter)) firstLetter = "*";

      if (!lingReduce[firstLetter]) lingReduce[firstLetter] = [ling];
      else lingReduce[firstLetter].push(ling);
    }
  }, {});

  const filterBy = (e, letter) => {
    e.preventDefault();
    setFilter(letter);
  }

  return (
    <main>
      <section id="container">
        <h1>{CapitalCase(TargetToPlural(2, lingName))}</h1>
        <div className="card filter">
          <a href="#container" onClick={(e) => { filterBy(e, "") }}>ALL</a>
          { Object.keys(lingReduce).sort().map(letter => {
            return (
              <a key={letter} href="#container" onClick={(e) => { filterBy(e, letter) }}>{letter}</a>
            )
          })}
        </div>
        { Object.keys(lingReduce).sort().map(letter => {
          if (filter.length > 0 && filter !== letter) return null;

          return (
            <div key={letter} className="letter">
              <h2>{letter}</h2>
              <div className="card">
                { lingReduce[letter].map((ling, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div key={i} className="ling">
                        <Link to={`${ling.id}`}><span className="name">{ling.name}</span></Link>
                      </div>
                      { lingReduce[letter].length - i > 1 ?
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

export default GroupLings;
