import React from 'react';

function ActivityCard({ data }) {
  return (
    <>
      <h2>In the last 24 hours</h2>
      <div className="card activity-card" id="past-day">
        { data.map((activity, i, arr) => {
            return (
              <div key={i} className={`activity ${ arr.length - i === 1 ? "last" : "" }`}>
                <span className="activity-symbol">
                  {/* TODO - Refactor this image, it's ugly */}
                  <img src={`
                    ${activity.action === "add" ?
                      'https://img.icons8.com/flat_round/50/000000/plus.png' :
                        activity.action === "edit" ?
                        'https://img.icons8.com/flat_round/64/000000/available-updates--v1.png' :
                        'https://img.icons8.com/flat_round/64/000000/delete-sign.png'
                    }
                  `} />
                </span>
                {/* TODO - Find a way to make this copy look nice! */}
                <h4>{activity.author} {activity.action} {activity.count} {activity.target}</h4>
                <span className="activity-context">
                  in <a href="PLACEHOLDER">{activity.group}</a>
                </span>
              </div>
            )
          }) }
      </div>
    </>
  )
}

export default ActivityCard;
