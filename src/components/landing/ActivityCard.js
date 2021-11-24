import React from "react";
import { Link } from "react-router-dom";

import { ActionToPastTense, TargetToPlural } from "../helpers/Helpers";

function ActivityCard({ data, heading }) {
  return (
    <>
      <h2>{heading}</h2>
      <div className="card activity-card" id="past-day">
        {data.map((activity, i, arr) => {
          return (
            <div
              key={i}
              className={`activity ${arr.length - i === 1 ? "last" : ""}`}
            >
              <span className="activity-symbol">
                {/* TODO - Refactor this image, it's ugly */}
                <img
                  alt="Symbol for activity action"
                  src={`
                    ${
                      activity.action === "add"
                        ? "https://img.icons8.com/flat_round/50/000000/plus.png"
                        : activity.action === "edit"
                        ? "https://img.icons8.com/flat_round/64/000000/available-updates--v1.png"
                        : "https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                    }
                  `}
                />
              </span>
              <h4>
                {activity.author} {ActionToPastTense(activity.action)}{" "}
                {activity.count}{" "}
                {activity.target === "ling"
                  ? TargetToPlural(activity.count, activity.ling_name)
                  : TargetToPlural(activity.count, activity.target)}
              </h4>
              <span className="activity-context">
                in{" "}
                <Link to={`/groups/${activity.group_id}`}>
                  {activity.group}
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ActivityCard;
