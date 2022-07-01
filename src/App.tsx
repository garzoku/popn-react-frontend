import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import FindActivities from "./components/find-activities/FindActivities";
import ActivityPage from "./components/activity-page/ActivityPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const activitiesFromServer = await fetchActivities();
      setActivities(activitiesFromServer);
    };

    getActivities();
    // dependencies would get passed into this empty array
  }, []);

  const fetchActivities = async () => {
    const response = await fetch("https://popndb.herokuapp.com/api/activities");
    const data = await response.json();

    return data;
  };

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
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
