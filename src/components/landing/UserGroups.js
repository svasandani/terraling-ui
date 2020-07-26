import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { ActionToPastTense, TargetToPlural } from '../helpers/Helpers';

import Loading from '../shared/Loading';

function UserGroups() {
  const [data, setData] = useState([]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "groups/list", { headers:{'accept': 'application/json'} })
        .then(response => response.json())
        .then((data) => {
          setData(data);
          setReady(true);
        });
  }, []);

  if (!ready) return(<Loading />);

  return (
    <aside>
      <div className="sidebar group-sidebar">
        <h1>Your groups</h1>
        <ul>
          { data.map((group, i) => {
            return (
              <li key={i}>
                <div className="card">
                  <h3>
                    <Link to={`/groups/${group.group.id}/overview`}>{group.group.name}</Link>
                  </h3>
                  { group.activity && group.activity.length > 0 ?
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
                  ) :
                  (
                    <span className="new-group-info">No recent activity.</span>
                  )}
                </div>
              </li>
            )
          }) }
        </ul>
      </div>
    </aside>
  )
}

export default UserGroups;
