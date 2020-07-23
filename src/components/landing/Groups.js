import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { ActionToPastTense, TargetToPlural } from '../helpers/Helpers';

function Groups() {
  const [data, setData] = useState({ groups: [] });

  useEffect(() => {
    fetch("https://ui.terraling.com/api/user")
      .then(response => response.json())
      .then(data => { setData(data) })
  }, []);

  return (
    <aside>
      <div className="sidebar">
        <h1>Your groups</h1>
        <ul>
          { data.groups.map((group, i) => {
            return (
              <li key={i}>
                <div className="card">
                  <h3>
                    <Link to="/group">{group.group}</Link>
                  </h3>
                  { group.activity.length > 0 ?
                  (
                    <>
                      { group.activity.map((activity, i) => {
                          return (
                            <p key={i}>
                              <span className="new-group-info">{activity.count} {ActionToPastTense(activity.action)} { activity.target === "ling" ?
                                (
                                  TargetToPlural(activity.count, activity.ling_name)
                                ) :
                                (
                                  TargetToPlural(activity.count, activity.target)
                                )
                              }</span>
                            </p>
                          )
                        })}
                    </>
                  ) : null }
                </div>
              </li>
            )
          }) }
        </ul>
      </div>
    </aside>
  )
}

export default Groups;
