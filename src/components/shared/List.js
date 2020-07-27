import React from 'react';

import '../../css/shared/List.css';

function List({ data, field, heading }) {
  if (data.length === 0) return null;

  return (
    <>
      <h2>{heading}</h2>
      <div className="card list">
        {
          data.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <span className="name">{field ? item[field] : item}</span>
                { data.length - i > 1 ?
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

export default List;
