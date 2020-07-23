import React, { useState, useEffect } from 'react';

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
                    <a href="PLACEHOLDER">{group.group}</a>
                  </h3>
                  { group.activity.length > 0 ?
                  (
                    <>
                      { group.activity.map((activity, i) => {
                          return (
                            <p key={i}>
                              {/* TODO - Add better formatting for this copy */}
                              <span className="new-group-info">{activity.count} {activity.action} {activity.target}</span>
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
