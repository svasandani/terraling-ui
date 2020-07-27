import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Loading from '../shared/Loading';

import '../../css/shared/Table.css';

function HeadingTable({ data, sort, link, columnMap }) {
  let keys = Object.keys(columnMap);

  let match = useRouteMatch();

  if (data.length === 0) return (
    <Loading />
  );

  if (sort !== undefined) {
    data = data.sort(sort);
  }

  if (link === undefined) {
    link = (url, id) => { return url + "/" + id; }
  }

  return (
    <>
      <div className="card header-card">
        <div className={`headers row row-${keys.length}`}>
          {
            keys.map((col, i) => {
              return (
                <span key={i} className="header name">{columnMap[col]}</span>
              )
            })
          }
        </div>
        { data.map((row, i) => {
          return (
            <React.Fragment key={i}>
              <div className={`row row-${keys.length}`}>
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
    </>
  );
}

export default HeadingTable;
