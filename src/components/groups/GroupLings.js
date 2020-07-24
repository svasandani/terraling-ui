import React from 'react';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function GroupLings({ lingData, lingName }) {
  console.log(lingData);
  return (
    <main>
      <section id="container">
        <h1>{CapitalCase(TargetToPlural(2, lingName))}</h1>
        <div className="card">
        { lingData.map((ling, i) => {
          return (
            <div key={i} className="ling">
              <span className="name">{ling.name}</span>
              { lingData.length - i > 1 ?
                (
                  <span className="h-divider" />
                ) :
                (
                  null
                )
              }
            </div>
          )
        }) }
        </div>
      </section>
    </main>
  );
}

export default GroupLings;
