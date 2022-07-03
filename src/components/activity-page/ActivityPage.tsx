import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ActivityPage.module.css";
import InfoIcon from "../info-icon/InfoIcon";
import { Activity } from "../../Activity";
import ButtonToExternalSite from "../buttons/ButtonToExternalSite";
import { Link } from "react-router-dom";

type ActivityList = {
  activities: Activity[];
};

const ActivityPage = ({ activities }: ActivityList) => {
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

  const { id } = useParams();

  const activity = activities.find((activity) => activity.id === +id!);

  return (
    <>
      <div className={styles.activityPage}>
        <figure className={styles.activity}>
          <div className={styles.gridContainer}>
            <div className={styles.grid1}>
              <div className={styles.image}>
                <img src={activity!.imageUrl} alt={activity!.name} />
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
