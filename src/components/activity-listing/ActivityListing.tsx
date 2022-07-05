import React from "react";
import { Activity } from "../../Activity";
import { Link } from "react-router-dom";
import InfoIcon from "../info-icon/InfoIcon";
import { dateFormatter, timeFormatter } from "../../util/PopnUtil";

import styles from "./ActivityListing.module.css";

import { ref, getDownloadURL, getStorage } from "firebase/storage";

type ActivityData = {
  activity: Activity;
};

const ActivityListing = ({ activity }: ActivityData) => {
  const storage = getStorage();
  getDownloadURL(ref(storage, `images/${activity.imageUrl}`)).then((url) => {
    const img = document.getElementById(activity.id!.toString());
    img?.setAttribute("src", url);
  });

  return (
    <>
      <Link to={`/activity/${activity.id}`}>
        <div className="selector">
          <figure className={styles.listing}>
            <div>
              <img className={styles.listingImage} src="" id={activity.id?.toString()} alt={activity.name} />
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
