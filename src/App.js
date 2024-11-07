import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routing/ProtectedRoute";
import { Col, Row } from "react-bootstrap";
import Header from "./components/Header";
import JobListings from "./components/JobListings";
import JobApplicationForm from "./components/JobApplicationForm";
import Profile from "./components/Profile"; // Import the Profile component
import AppliedJobs from "./components/AppliedJobs"; // Import the AppliedJobs component
import AddJob from "./components/AddJob"; // Import the AppliedJobs component
import ViewCreatedJobs from "./components/ViewCreatedJobs";
import EditJob from "./components/EditJob";
import ApplicationsInstructions from "./components/ApplicationsInstructions";
import ManageUsers from "./components/ManageUsers";
import EditUser from "./components/EditUser";
import AdminDashboard from "./components/AdminDashboard";
import AddSchedule from "./components/AddSchedule";
import ViewUserSchedule from "./components/ViewUserSchedule";
import ViewCompanySchedule from "./components/ViewCompanySchedule";

import { db } from "./firebase/config";
import { ref, get } from "firebase/database";

const App = () => {
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to update user profile
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  const [schedules, setSchedules] = useState([]);

  const loginUser = async (email, password) => {
    const dbRef = ref(db, "users");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = snapshot.val();

      const tempUsers = Object.keys(users)
        .map((id) => {
          return {
            ...users[id],
            id,
          };
        })
        .filter((user) => {
          return user.email === email && user.password === password;
        });

      if (tempUsers.length === 1) {
        setUser(tempUsers[0]);
        localStorage.setItem(
          "job-application-tracker",
          JSON.stringify(tempUsers[0])
        );
      }
    } else {
      setUser({});
    }
  };

  const loadJobs = async () => {
    const dbRef = ref(db, "jobs");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const jobs = snapshot.val();
      const tempJobs = Object.keys(jobs).map((id) => {
        return {
          ...jobs[id],
          id,
        };
      });

      setJobs(tempJobs);
      setFilteredJobs(tempJobs); // Initially set filtered jobs to all jobs
    } else {
      setJobs([]);
      setFilteredJobs([]);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job); // Set selected job for the application form
  };

  const categories = [...new Set(jobs.map((job) => job.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Filter jobs based on the selected category
    if (category === "All") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.category === category));
    }
  };

  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  const handleApplicationSubmit = (formData) => {
    setApplications((prevApplications) => [
      ...prevApplications,
      {
        jobTitle: selectedJob.title,
        dateApplied: formatDateToYYYYMMDD(new Date()),
        ...formData,
      },
    ]);
    setSelectedJob(null); // Clear the selected job after submission
  };

  const loadApplications = async () => {
    const dbRef = ref(db, "applications"); // Reference to the "applications" path in Firebase
    const snapshot = await get(dbRef); // Fetch data from Firebase
    if (snapshot.exists()) {
      const applicationsData = snapshot.val(); // Get the data
      const tempApplications = Object.keys(applicationsData).map((id) => {
        return {
          ...applicationsData[id], // Spread the application data
          id, // Include the application ID
        };
      });

      setApplications(tempApplications); // Update the state with the fetched applications
    } else {
      setApplications([]); // If no applications exist, set an empty array
    }
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and pad with leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Get the day (1-31) and pad with leading zero

    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }

  const viewAllAppliedJobs = async () => {
    const dbRef = ref(db, "applications");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const application = snapshot.val();
      const tempApplications = Object.keys(application).map((id) => {
        return {
          ...application[id],
          id,
        };
      });

      setApplications(tempApplications);
    } else {
      setApplications([]);
    }
  };

  useEffect(() => {
    loadApplications();
    loadJobs();

    const user = localStorage.getItem("job-application-tracker");
    try {
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (err) {}
  }, []);

  return (
    <Router>
      <Row>
        <Col md={3}>
          <Sidebar user={user} setUser={setUser} />
        </Col>
        <Col md={9} className="p-0 m-0">
          <Routes>
            <Route
              path="/register"
              element={
                <Register user={user} setUser={setUser} loginUser={loginUser} />
              }
            />

            <Route
              path="/login"
              element={
                <Login user={user} setUser={setUser} loginUser={loginUser} />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  {user.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <div className="d-flex flex-column justify-content-around align-items-center vh-100 dashboard">
                      <Header
                        categories={["All", ...categories]} // Add "All" to categories
                        selectedCategory={selectedCategory}
                        setSelectedCategory={handleCategoryChange} // Pass function to change category
                      />
                      <JobListings
                        jobs={filteredJobs}
                        handleApply={handleApply} // Pass filtered jobs
                        loadJobs={loadJobs}
                        user={user}
                        schedules={schedules}
                        setSchedules={setSchedules}
                        applications={applications}
                      />
                    </div>
                  )}
                </ProtectedRoute>
              }
            />

            <Route
              path="/apply"
              element={
                <ProtectedRoute user={user}>
                  <JobApplicationForm
                    user={user}
                    selectedJob={selectedJob}
                    onSubmit={handleApplicationSubmit}
                    categories={categories}
                    formatDateToYYYYMMDD={formatDateToYYYYMMDD}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/view-schedule"
              element={
                <ProtectedRoute user={user}>
                  {user.role === "user" && (
                    <ViewUserSchedule
                      user={user}
                      userId={user.id}
                      schedules={schedules}
                      setSchedules={setSchedules}
                    />
                  )}
                  {user.role === "company" && (
                    <ViewCompanySchedule
                      user={user}
                      companyId={user.id}
                      schedules={schedules}
                      setSchedules={setSchedules}
                    />
                  )}
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-schedule"
              element={
                <ProtectedRoute user={user}>
                  <AddSchedule user={user} companyId={user.id} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applied-jobs"
              element={
                <ProtectedRoute user={user}>
                  <AppliedJobs
                    applications={applications}
                    viewAllAppliedJobs={viewAllAppliedJobs}
                    formatDateToYYYYMMDD={formatDateToYYYYMMDD}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} updateUser={updateUser} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-job"
              element={
                <ProtectedRoute user={user}>
                  <AddJob
                    user={user}
                    formatDateToYYYYMMDD={formatDateToYYYYMMDD}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/created-jobs"
              element={<ViewCreatedJobs user={user} />}
            />

            <Route path="/edit-job/:jobId" element={<EditJob user={user} />} />

            <Route
              path="/instructions"
              element={<ApplicationsInstructions />}
            />

            <Route path="/manage-users" element={<ManageUsers />} />

            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
