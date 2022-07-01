import React from "react";
import { Activity } from "../../Activity";
import { Link } from "react-router-dom";
import InfoIcon from "../info-icon/InfoIcon";

import styles from "./ActivityListing.module.css";

type ActivityData = {
  activity: Activity;
};

const ActivityListing = ({ activity }: ActivityData) => {
  function dateFormatter(date: string) {
    if (!date) {
      return `No Dates`;
    }
    return `${date.slice(5, 7)}/${date.slice(8, date.length)}/${date.slice(0, 4)}`;
  }

  function timeFormatter(time: string) {
    if (!time) {
      return `No Hours`;
    }
    let timeFormat = "";
    if (time.slice(0, 2).includes("00")) {
      timeFormat = `12:${time.slice(3, 5)} AM`;
    } else if (time.slice(0, 2).includes("12")) {
      timeFormat = `12:${time.slice(3, 5)} PM`;
    } else if (time.slice(0, 1).includes("0")) {
      timeFormat = `${time.slice(1, 5)} AM`;
    } else if (+time.slice(0, 2) > 12) {
      let hour = +time.slice(0, 2) - 12;
      timeFormat = `${hour}${time.slice(2, 5)} PM`;
    } else {
      timeFormat = `${time.slice(0, 5)} AM`;
    }
    return timeFormat;
  }

  return (
    <>
      <Link to={`/activity/${activity.id}`}>
        <div className="selector">
          <figure className={styles.listing}>
            <div>
              <img className={styles.listingImage} src={activity.imageUrl} alt={activity.name} />
            </div>
            <div className={styles.listingContent}>
              <div className={styles.listingTitle}>
                <h2>{activity.name}</h2>
              </div>
              <InfoIcon activity={activity} />
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
              <div className={styles.location}>
                <p>{activity.city},</p>
                <p>{activity.state}</p>
              </div>
            </div>
          </figure>
        </div>
      </Link>
    </>
  );
};

export default ActivityListing;
