import { useState } from "react";
import React from "react";
import AddActivityStyles from "./AddActivity.module.css";
import { Activity } from "../../Activity";
import ActivityService from "../../ActivityService";

type ActivityList = {
  activities: Activity[];
};

const AddActivity = (activities: ActivityList) => {
  const activityService = new ActivityService();

  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("Grand Ole Opry");
  const [websiteUrl, setWebsiteUrl] = useState("www.grandoleopry.com");
  const [city, setCity] = useState("Nashville");
  const [state, setState] = useState("Tennessee");
  const [description, setDescription] = useState("good ole fun");
  const [hourBeginning, setHourBeginning] = useState("");
  const [hourEnding, setHourEnding] = useState("");
  const [dateBeginning, setDateBeginning] = useState("");
  const [dateEnding, setDateEnding] = useState("");
  const [isChildFriendly, setIsChildFriendly] = useState(false);
  const [isAdmission, setIsAdmission] = useState(false);
  const [isNoAlcohol, setIsNoAlcohol] = useState(false);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [isParking, setIsParking] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [isWifi, setIsWifi] = useState(false);
  const [isRsvp, setIsRsvp] = useState(false);

  function handleSubmit(event: any) {
    let activity = createActivity();
    activityService.postActivity(activity).then((response) => response.data);
  }

  const onSelectFile = (event: any) => {
    if (event.target.value) {
      setImageUrl(event.target.value);
      setIsImage(true);
      event.preventDefault();
    } else {
      setImageUrl("");
      setIsImage(false);
      event.preventDefault();
    }
  };

  function createActivity(): Activity {
    return {
      imageUrl,
      name,
      websiteUrl,
      city,
      state,
      description,
      hourBeginning,
      hourEnding,
      dateBeginning,
      dateEnding,
      isChildFriendly,
      isAdmission,
      isNoAlcohol,
      isPetFriendly,
      isParking,
      isAccessible,
      isWifi,
      isRsvp,
    };
  }

  return (
    <>
      <div className={AddActivityStyles.addActivityBackground}>
        <div className={AddActivityStyles.addActivityFormContainer}>
          <form className={AddActivityStyles.addActivityForm} onSubmit={handleSubmit}>
            <div className={AddActivityStyles.formTop}>
              <div className={AddActivityStyles.topLeft}>
                <label htmlFor="imageUrl">Upload Image</label>
                <br />
                <input type="text" name="imageUrl" id="imageUrl" value={imageUrl} onChange={onSelectFile} />
                <br />
                {!isImage ? <img className={AddActivityStyles.imagePreview} src={require(`../assets/imagepreview.png`)} alt="preview" /> : <img className={AddActivityStyles.imagePreview} src={imageUrl} alt="preview" />}
                <br />

                <label htmlFor="name">Activity Name</label>
                <br />
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="city">City</label>
                <br />
                <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                <br />
              </div>
              <div className={AddActivityStyles.topRight}>
                <label htmlFor="websiteUrl">Website</label>
                <br />
                <input type="text" id="websiteUrl" name="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
                <br />
                <div className={AddActivityStyles.hoursDates}>
                  <div className={AddActivityStyles.hours}>
                    <label htmlFor="hourBeginning">Open</label>
                    <br />
                    <input type="time" id="hourBeginning" name="hourBeginning" value={hourBeginning} onChange={(e) => setHourBeginning(e.target.value)} />
                    <br />

                    <label htmlFor="hourEnding">Closed</label>
                    <br />
                    <input type="time" id="hourEnding" name="hourEnding" value={hourEnding} onChange={(e) => setHourEnding(e.target.value)} />
                    <br />
                  </div>
                  <div className={AddActivityStyles.dates}>
                    <label htmlFor="dateBeginning">Begins</label>
                    <br />
                    <input type="date" id="dateBeginning" name="dateBeginning" value={dateBeginning} onChange={(e) => setDateBeginning(e.target.value)} />
                    <br />

                    <label htmlFor="dateEnding">Ends</label>
                    <br />
                    <input type="date" id="dateEnding" name="dateEnding" value={dateEnding} onChange={(e) => setDateEnding(e.target.value)} />
                    <br />
                  </div>
                </div>
                <label htmlFor="description">Description</label>
                <br />
                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <br />
                <label htmlFor="state">State</label>
                <br />
                <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                <br />
              </div>
            </div>
            <div className={AddActivityStyles.formBottom}>
              <legend>Choose Info Badges:</legend>
              <ul className={AddActivityStyles.checkboxes}>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isChildFriendly">Child-Friendly</label>
                  <input type="checkbox" name="isChildFriendly" id="isChildFriendly" checked={isChildFriendly} onChange={(e) => setIsChildFriendly(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isAdmission">Admission Fee</label>
                  <input type="checkbox" name="isAdmission" id="isAdmission" checked={isAdmission} onChange={(e) => setIsAdmission(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isNoAlcohol">Alcohol Prohibited</label>
                  <input type="checkbox" name="isNoAlcohol" id="isNoAlcohol" checked={isNoAlcohol} onChange={(e) => setIsNoAlcohol(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isPetFriendly">Pet-Friendly</label>
                  <input type="checkbox" name="isPetFriendly" id="isPetFriendly" checked={isPetFriendly} onChange={(e) => setIsPetFriendly(e.target.checked)} />
                </li>
                <br />
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isParking">Local Parking</label>
                  <input type="checkbox" name="isParking" id="isParking" checked={isParking} onChange={(e) => setIsParking(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isAccessible">Accessible</label>
                  <input type="checkbox" name="isAccessible" id="isAccessible" checked={isAccessible} onChange={(e) => setIsAccessible(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isWifi">Free Wifi</label>
                  <input type="checkbox" name="isWifi" id="isWifi" checked={isWifi} onChange={(e) => setIsWifi(e.target.checked)} />
                </li>
                <li className={AddActivityStyles.option}>
                  <label htmlFor="isRsvp">RSVP Only</label>
                  <input type="checkbox" name="isRsvp" id="isRsvp" checked={isRsvp} onChange={(e) => setIsRsvp(e.target.checked)} />
                </li>
              </ul>
            </div>
            <input className={AddActivityStyles.button} type="submit" readOnly value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
