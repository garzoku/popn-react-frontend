import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import FindActivities from "./components/find-activities/FindActivities";
import ActivityPage from "./components/activity-page/ActivityPage";
import AddActivity from "./components/add-activity/AddActivity";
import ActivityService from "./ActivityService";
import EditActivity from "./components/edit-activity/EditActivity";
import Login from "./components/login/LoginPage";
import Signup from "./components/signup/Signup";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ForgotPassword from "./components/forgot-password/ForgotPassword";

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import UpdateProfile from "./components/update-profile/UpdateProfile";

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
    <AuthProvider>
    <div className="App">
      <Header />
      <main className="background">
        <div className="side-padding">
          <Routes>
            <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>}></Route>
            <Route path="/find-activities" element={<FindActivities activities={activities} />}></Route>
            <Route path="/activity/:id" element={<ActivityPage activities={activities} />}></Route>
            <Route path="/add-activity" element={<PrivateRoute><AddActivity /></PrivateRoute>}></Route>
            <Route path="/edit-activity/:id" element={<PrivateRoute><EditActivity activities={activities} /></PrivateRoute>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>
          </Routes>
        </div>
      </main>
    </div>
    </AuthProvider>
  );
}

export default App;
