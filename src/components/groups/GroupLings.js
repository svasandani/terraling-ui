import React from 'react';
import { Link } from 'react-router-dom';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function GroupLings({ lingData, lingName }) {

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

  console.log(lingReduce);

  return (
    <main>
      <section id="container">
        <h1>{CapitalCase(TargetToPlural(2, lingName))}</h1>
        { Object.keys(lingReduce).sort().map(letter => {
          return (
            <div key={letter} className="letter">
              <h2>{letter}</h2>
              <div className="card">
                { lingReduce[letter].map((ling, i) => {
                  return (
                    <Link key={i} to={ling.id}>
                      <div className="ling">
                        <a><span className="name">{ling.name}</span></a>
                      </div>
                      { lingReduce[letter].length - i > 1 ?
                        (
                          <span className="h-divider" />
                        ) :
                        (
                          null
                        )
                      }
                    </Link>
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
