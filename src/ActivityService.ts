import axios from "axios";
import { Activity } from "./Activity";

export class ActivityService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://popndb.herokuapp.com/api/activities";
  }

  fetchActivities = async () => {
    return axios
      .get("https://popndb.herokuapp.com/api/activities")
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  deleteActivity = async (id: number) => {
    return axios.delete(`https://popndb.herokuapp.com/api/activities/${id}`).then((response) => response.data);
  };

  postActivity = async (activity: Activity) => {
    return axios.post("https://popndb.herokuapp.com/api/activities", activity).then((response) => response.data);
  };
}

export default ActivityService;
