import React, { useState, useEffect } from 'react';

import ActivityCard from './ActivityCard';

function Groups() {
  const [data, setData] = useState({ recent_activity: {
    past_day: [],
    past_week: [],
    further_back: []
  } });

  useEffect(() => {
    fetch("https://ui.terraling.com/api/recent-activity")
      .then(response => response.json())
      .then(data => { setData(data) })
  }, []);

  return (
    <main>
      <section id="activity">
        <h1>Recent activity</h1>
        { data.recent_activity.past_day.length > 0 ?
        (
          <ActivityCard data={data.recent_activity.past_day} />
        ) : null }
        { data.recent_activity.past_week.length > 0 ?
        (
          <ActivityCard data={data.recent_activity.past_week} />
        ) : null }
        { data.recent_activity.further_back.length > 0 ?
        (
          <ActivityCard data={data.recent_activity.further_back} />
        ) : null }
      </section>
    </main>
  )
}

export default Groups;
