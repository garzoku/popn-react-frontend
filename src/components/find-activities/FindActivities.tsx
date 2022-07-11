import React from "react";
import { Activity } from "../../Activity";
import ActivityListing from "../activity-listing/ActivityListing";

import styles from "./FindActivities.module.css";

type ActivityList = {
  activities: Activity[];
};

const FindActivities = ({ activities }: ActivityList) => {
  return (
    <>
      <div className="pt-4 d-flex justify-content-center flex-nowrap">
        <div className={styles.findActivities}>
          <ul className={styles.listings}>
            {activities.map((activity) => (
              <li key={activity.id}>
                <ActivityListing activity={activity} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FindActivities;
