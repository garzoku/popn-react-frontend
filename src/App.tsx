import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import FindActivities from "./components/find-activities/FindActivities";
import ActivityPage from "./components/activity-page/ActivityPage";
import AddActivity from "./components/add-activity/AddActivity";
import ActivityService from "./ActivityService";
import EditActivity from "./components/edit-activity/EditActivity";

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/signup-page/Signup";

function App() {
  let location = useLocation();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const activityService = new ActivityService();

    const getActivities = async () => {
      const activitiesFromServer = await activityService.fetchActivities();
      setActivities(activitiesFromServer);
    };
    getActivities();
    // execute useEffect every time router location changes.
  }, [location]);

  return (
    <div className="App">
      <Header />
      <main className="background">
        <div className="side-padding">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/find-activities" element={<FindActivities activities={activities} />}></Route>
            <Route path="/activity/:id" element={<ActivityPage activities={activities} />}></Route>
            <Route path="/add-activity" element={<AddActivity />}></Route>
            <Route path="/edit-activity/:id" element={<EditActivity activities={activities} />}></Route>
            <Route path="/signup-page" element={<Signup />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
