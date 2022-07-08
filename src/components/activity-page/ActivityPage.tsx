import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ActivityPage.module.css";
import InfoIcon from "../info-icon/InfoIcon";
import { Activity } from "../../Activity";
import { Link } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../../util/PopnUtil";

import { ref, getDownloadURL, getStorage } from "firebase/storage";
import HoursDates from "../hours-dates/HoursDates";

import { Form, Button, Card, Container, Anchor, Image } from "react-bootstrap";

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
      <Card className={styles.activityPage}>
        <Card.Body className={styles.gridContainer}>
          <div className={styles.grid1}>
            <Image className={styles.image} src="" id={activity!.id?.toString()} alt={activity!.name} />
          </div>
          <div className={styles.grid2}>
            <div className={styles.name}>
              <h2>{activity!.name}</h2>
            </div>
            <ul className={styles.links}>
              <li>
                <Anchor className="btn-primary" href={`https://www.google.com/maps/dir/?api=1query=${activity!.name}+${activity!.city}+${activity!.state}`}>
                  Directions
                </Anchor>
              </li>
              <li>
                <Anchor className="btn-primary" href={activity!.websiteUrl}>
                  Website
                </Anchor>
              </li>
            </ul>
            <div className={styles.badges}>
              <InfoIcon activity={activity!} />
            </div>
            <HoursDates activity={activity!} />
          </div>
          <div className={styles.grid3}>
            <div className={styles.activityButton}>
              <Link to={`/edit-activity/${activity!.id}`} className="btn-primary">
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
        </Card.Body>
      </Card>
    </>
  );
};

export default ActivityPage;
