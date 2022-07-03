import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import FindActivities from "./components/find-activities/FindActivities";
import ActivityPage from "./components/activity-page/ActivityPage";
import AddActivity from "./components/add-activity/AddActivity";
import ActivityService from "./ActivityService";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

function App() {
  const activityService = new ActivityService();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const activitiesFromServer = await activityService.fetchActivities();
      setActivities(activitiesFromServer);
    };

    getActivities();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="background">
          <div className="side-padding">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/find-activities" element={<FindActivities activities={activities} />}></Route>
              <Route path="/activity/:id" element={<ActivityPage activities={activities} />}></Route>
              <Route path="/add-activity" element={<AddActivity activities={activities} />}></Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
