import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ActivityPage.module.css";
import InfoIcon from "../info-icon/InfoIcon";
import { Activity } from "../../Activity";
import ButtonToExternalSite from "../buttons/ButtonToExternalSite";
import { Link } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../../util/PopnUtil";

import { ref, getDownloadURL, getStorage } from "firebase/storage";

type ActivityList = {
  activities: Activity[];
};

const ActivityPage = ({ activities }: ActivityList) => {
  const { id } = useParams();

  const activity = activities.find((activity) => activity.id === +id!);

  const storage = getStorage();
  getDownloadURL(ref(storage, `images/${activity!.imageUrl}`)).then((url) => {
    const img = document.getElementById(activity!.id!.toString());
    img?.setAttribute("src", url);
  });

  return (
    <>
      <div className={styles.activityPage}>
        <figure className={styles.activity}>
          <div className={styles.gridContainer}>
            <div className={styles.grid1}>
              <div className={styles.image}>
                <img className={styles.listingImage} src="" id={activity!.id?.toString()} alt={activity!.name} />
              </div>
            </div>
            <div className={styles.grid2}>
              <div className={styles.name}>
                <h2>{activity!.name}</h2>
              </div>
              <ul className={styles.links}>
                <li>
                  <ButtonToExternalSite text={"Directions"} link={`https://www.google.com/maps/dir/?api=1query=${activity!.name}+${activity!.city}+${activity!.state}`} />
                </li>
                <li>
                  <ButtonToExternalSite text={"Website"} link={activity!.websiteUrl} />
                </li>
              </ul>
              <div className={styles.badges}>
                <InfoIcon activity={activity!} />
              </div>
              <div className={styles.activityMetadata}>
                <p>
                  <span>Hours: </span>
                  {timeFormatter(activity!.hourBeginning)}
                  <span> Until </span>
                  {timeFormatter(activity!.hourEnding)}
                </p>
                <p>
                  <span>Dates: </span>
                  {dateFormatter(activity!.dateBeginning)}
                  <span> Thru </span>
                  {dateFormatter(activity!.dateEnding)}
                </p>
              </div>
            </div>
            <div className={styles.grid3}>
              <div className={styles.activityButton}>
                <Link to={`/edit-activity/${activity!.id}`} className={styles.button}>
                  Edit
                </Link>
              </div>
            </div>
            <div className={styles.grid4}>
              <div className={styles.activityDescription}>
                <figcaption>
                  <p>{activity!.description}</p>
                </figcaption>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </>
  );
};

export default ActivityPage;
