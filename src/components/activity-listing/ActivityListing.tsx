import React from "react";
import { Activity } from "../../Activity";
import { Link } from "react-router-dom";
import InfoIcon from "../info-icon/InfoIcon";
import { dateFormatter, timeFormatter } from "../../util/PopnUtil";

import styles from "./ActivityListing.module.css";

import { ref, getDownloadURL, getStorage } from "firebase/storage";
import HoursDates from "../hours-dates/HoursDates";
import { Form, Button, Card, Container, Image } from "react-bootstrap";
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
      <Link to={`/activity/${activity.id}`} className={styles.linkTo}>
        <Card className={styles.selector}>
          <Card.Body className={styles.listing}>
            <Image className={styles.image} src="" id={activity.id?.toString()} alt={activity.name} />
            <Container className={styles.listingContent}>
              <div className={styles.listingTitle}>
                <h2 className={styles.listingTitle}>{activity.name}</h2>
              </div>
              <InfoIcon activity={activity} />
              <HoursDates activity={activity} />
              <div className={styles.location}>
                <p>{activity.city},</p>
                <p>{activity.state}</p>
              </div>
            </Container>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

export default ActivityListing;
