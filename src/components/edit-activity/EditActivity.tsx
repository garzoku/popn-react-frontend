import { useState, useEffect } from "react";
import React from "react";
import AddActivityStyles from "../add-activity/AddActivity.module.css";
import EditActivityStyles from "./EditActivity.module.css"
import { Activity } from "../../Activity";
import ActivityService from "../../ActivityService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, StorageReference, getDownloadURL, getStorage } from "firebase/storage";
import { ImageBlobToUrl } from "../../util/PopnUtil";
import { Form, Button, Card, Container } from "react-bootstrap";
const { v4: uuidv4 } = require("uuid");
type ActivityList = {
  activities: Activity[];
};

const EditActivity = ({ activities }: ActivityList) => {
  let navigate = useNavigate();
  const activityService = new ActivityService();

  const { id } = useParams();
  const activity = activities.find((activity) => activity.id === +id!);

  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(activity!.imageUrl);
  const [name, setName] = useState(activity!.name);
  const [websiteUrl, setWebsiteUrl] = useState(activity!.websiteUrl);
  const [city, setCity] = useState(activity!.city);
  const [state, setState] = useState(activity!.state);
  const [description, setDescription] = useState(activity!.description);
  const [hourBeginning, setHourBeginning] = useState(activity!.hourBeginning);
  const [hourEnding, setHourEnding] = useState(activity!.hourEnding);
  const [dateBeginning, setDateBeginning] = useState(activity!.dateBeginning);
  const [dateEnding, setDateEnding] = useState(activity!.dateEnding);
  const [isChildFriendly, setIsChildFriendly] = useState(activity!.isChildFriendly);
  const [isAdmission, setIsAdmission] = useState(activity!.isAdmission);
  const [isNoAlcohol, setIsNoAlcohol] = useState(activity!.isNoAlcohol);
  const [isPetFriendly, setIsPetFriendly] = useState(activity!.isPetFriendly);
  const [isParking, setIsParking] = useState(activity!.isParking);
  const [isAccessible, setIsAccessible] = useState(activity!.isAccessible);
  const [isWifi, setIsWifi] = useState(activity!.isWifi);
  const [isRsvp, setIsRsvp] = useState(activity!.isRsvp);

  const storage = getStorage();
  // state for upload image
  const [imageUpload, setImageUpload] = useState<Blob>();
  const [imageRef, setImageRef] = useState<StorageReference>(ref(storage, `images/${activity!.imageUrl}`));

  if (!isImage) {
    getDownloadURL(ref(storage, `images/${activity!.imageUrl}`)).then((url) => {
      const img = document.getElementById(activity!.id!.toString());
      img?.setAttribute("src", url);
      setIsImage(true);
    });
  }

  function handleSubmit(event: any) {
    let updatedActivity = createActivity();
    uploadImage();
    activityService.editActivity(updatedActivity).then((response) => {
      alert(`${response.name} has been updated!`);
      // navigate(`/activity/${response.id}`);
      navigate(`/find-activities`);
    });
    event.preventDefault();
  }

  // add this function to handleSubmit
  const uploadImage = () => {
    uploadBytes(imageRef!, imageUpload!).then((res) => res);
  };

  const onSelectFile = (event: any) => {
    if (event.target.value) {
      setImageUpload((prevImageUpload) => event.target.files[0]);
      setImageRef((prevImageRef) => ref(storage, `images/${event.target.files[0].name + uuidv4()}`));
      const img = document.getElementById(activity!.id!.toString());
      img?.setAttribute("src", ImageBlobToUrl(event.target.files[0]));
    } else {
      getDownloadURL(ref(storage, `images/imagepreview.png`)).then((url) => {
        const img = document.getElementById(activity!.id!.toString());
        img?.setAttribute("src", url);
      });
    }
  };

  function createActivity(): Activity {
    return {
      id: activity!.id,
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

  const removeActivity = (event: any) => {
    activityService.deleteActivity(activity!.id!).then((res) => res);
    event.preventDefault();
  };

  useEffect(() => {
    if (imageRef) {
      setImageUrl(imageRef!.name);
      setIsImage(true);
    } else {
      setImageUrl("");
      setIsImage(false);
    }
  }, [imageUpload, imageRef, isImage, imageUrl, activity]);
  return (
    <>
      <div className="pt-4 d-flex justify-content-center flex-nowrap">
        <Card>
          <Card.Body>
            <Form className="container" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col w-50">
                  <Form.Group className={AddActivityStyles.group}>
                    <div className={AddActivityStyles.previewContainer}>
                      <img src="" alt="preview" id={activity!.id?.toString()} />
                    </div>
                    <br />
                    <label htmlFor="imageUrl" className={AddActivityStyles.customFileUpload}>
                      <span className="material-symbols-outlined">add</span>Select Image
                    </label>
                    <br />
                    <input required type="file" name="imageUrl" id="imageUrl" onChange={onSelectFile} accept="image/png, image/gif, image/jpeg" />
                    <br />
                  </Form.Group>
                </div>
                <div className="col w-50">
                  <Form.Group className={AddActivityStyles.group}>
                    <label htmlFor="name">Activity Name</label>
                    <br />
                    <input className="w-100" required type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                  </Form.Group>
                  <Form.Group className={AddActivityStyles.group}>
                    {" "}
                    <label htmlFor="websiteUrl">Website</label>
                    <br />
                    <input className="w-100" type="text" id="websiteUrl" name="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
                    <br />
                  </Form.Group>
                  <Form.Group className={AddActivityStyles.group}>
                    <div className="row">
                      <div className="col">
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="city">City</label>
                          <br />
                          <input className="w-100" required type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>
                      </div>
                      <div className="col">
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="state">State</label>
                          <br />
                          <input className="w-100" required type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                          <br />
                        </Form.Group>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col w-50">
                  <Form.Group className={AddActivityStyles.group}>
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea required id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <br />
                  </Form.Group>
                </div>
                <div className="col w-50">
                  <Form.Group className={AddActivityStyles.group}>
                    <div className="row">
                      <div className="col w-50">
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="hourBeginning">Open</label>
                          <br />
                          <input type="time" id="hourBeginning" name="hourBeginning" value={hourBeginning} onChange={(e) => setHourBeginning(e.target.value)} />
                          <br />
                        </Form.Group>
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="hourEnding">Closed</label>
                          <br />
                          <input type="time" id="hourEnding" name="hourEnding" value={hourEnding} onChange={(e) => setHourEnding(e.target.value)} />
                          <br />
                        </Form.Group>
                      </div>
                      <div className="col w-50">
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="dateBeginning">Begins</label>
                          <br />
                          <input type="date" id="dateBeginning" name="dateBeginning" value={dateBeginning} onChange={(e) => setDateBeginning(e.target.value)} />
                          <br />
                        </Form.Group>
                        <Form.Group className={AddActivityStyles.group}>
                          <label htmlFor="dateEnding">Ends</label>
                          <br />
                          <input type="date" id="dateEnding" name="dateEnding" value={dateEnding} onChange={(e) => setDateEnding(e.target.value)} />
                          <br />
                        </Form.Group>
                      </div>
                    </div>
                  </Form.Group>
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
              <div className={EditActivityStyles.buttons}>
                <input className="btn btn-primary mb-1" readOnly value="Delete" onClick={removeActivity} />
                <input className="btn btn-primary" type="submit" readOnly value="Submit" />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default EditActivity;
