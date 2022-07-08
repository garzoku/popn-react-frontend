import React from "react";
import { Activity } from "../../Activity";
import { dateFormatter, timeFormatter } from "../../util/PopnUtil";
import styles from "./HoursDates.module.css";

type ActivityData = {
  activity: Activity;
};
const HoursDates = ({ activity }: ActivityData) => {
  return (
    <div className={styles.listingMetadata}>
      <p>
        <span>Hours: </span>
        {timeFormatter(activity.hourBeginning)}
        <span> Until </span>
        {timeFormatter(activity.hourEnding)}
      </p>
      <p>
        <span>Dates: </span>
        {dateFormatter(activity.dateBeginning)}
        <span> Thru </span>
        {dateFormatter(activity.dateEnding)}
      </p>
    </div>
  );
};

export default HoursDates;
