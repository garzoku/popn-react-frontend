import React from "react";
import InfoIconStyles from "./InfoIcon.module.css";
import { Activity } from "../../Activity";

type ActivityData = {
  activity: Activity;
};

const InfoIcon = ({ activity }: ActivityData) => {
  return (
    <>
      <ul className={InfoIconStyles.infoIcons}>
        {activity.isChildFriendly && (
          <li>
            <span className="material-symbols-outlined">child_friendly</span>
          </li>
        )}
        {activity.isAdmission && (
          <li>
            <span className="material-symbols-outlined">attach_money</span>
          </li>
        )}
        {activity.isNoAlcohol && (
          <li>
            <span className="material-symbols-outlined">no_drinks</span>
          </li>
        )}
        {activity.isPetFriendly && (
          <li>
            <span className="material-symbols-outlined">pets</span>
          </li>
        )}
        {activity.isParking && (
          <li>
            <span className="material-symbols-outlined">local_parking</span>
          </li>
        )}
        {activity.isAccessible && (
          <li>
            <span className="material-symbols-outlined">accessible</span>
          </li>
        )}
        {activity.isWifi && (
          <li>
            <span className="material-symbols-outlined">wifi</span>
          </li>
        )}
        {activity.isRsvp && (
          <li>
            <span className="material-symbols-outlined">Rsvp</span>
          </li>
        )}
      </ul>
    </>
  );
};

export default InfoIcon;
