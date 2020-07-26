import React from 'react';

import '../../css/searches/SearchParams.css';

function SearchParams({ params }) {
  if (params.length === 0) return null;

  return (
    <>
      <h2>Your search parameters</h2>
      <div className="card params">
        {
          params.map((ling, i) => {
            return (
              <React.Fragment key={i}>
                <span className="name">{ling.name}</span>
                { params.length - i > 1 ?
                  (
                    <span className="v-divider"> | </span>
                  ) :
                  (
                    null
                  )
                }
              </React.Fragment>
            )
          })
        }
      </div>
    </>
  )
}

export default SearchParams;
