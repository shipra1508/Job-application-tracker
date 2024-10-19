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
import AppliedJobs from "./components/AppliedJobs"; // Import the Profile component

import { db } from "./firebase/config";
import { ref, get } from "firebase/database";

const App = () => {
  const [user, setUser] = useState({
    email: "divya@gmail.com",
    experience: "5",
    password: "divya123",
    role: "user",
    skills: "React,Java",
    username: "Divya",
    id: "-O9VobrX-_0LvQQXjC0M",
  });
  const [jobs, setJobs] = useState([]);

  // Function to update user profile
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

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
      setFilteredJobs(tempJobs);
    } else {
      setJobs({});
    }
  };

  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([
    {
      jobTitle: "UI Engineer II",
      fullName: "John Doe",
      email: "john.doe",
      preferredSkills: "Web Development",
      maritalStatus: "Married",
      experience: "2",
      dateApplied: formatDateToYYYYMMDD(new Date()),
    },
    {
      jobTitle: "UI Engineer I",
      fullName: "John Doe",
      email: "john.doe",
      preferredSkills: "Web Development",
      maritalStatus: "Married",
      experience: "2",
      dateApplied: formatDateToYYYYMMDD(new Date()),
    },
    {
      jobTitle: "Full Stack Developer",
      fullName: "John Doe",
      email: "john.doe",
      preferredSkills: "Web Development",
      maritalStatus: "Married",
      experience: "2",
      dateApplied: formatDateToYYYYMMDD(new Date()),
    },
  ]);

  const handleApply = (job) => {
    setSelectedJob(job); // Set selected job for the application form
  };

  const categories = [...new Set(jobs.map((job) => job.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and pad with leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Get the day (1-31) and pad with leading zero

    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }

  // Handle submission of job applications
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

  return (
    <Router>
      <Row>
        <Col md={3}>
          <Sidebar user={user} />
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
                  <div className="d-flex flex-column justify-content-around align-items-center vh-100 dashboard">
                    <Header
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <JobListings
                      jobs={filteredJobs}
                      handleApply={handleApply} // Pass filtered jobs
                      loadJobs={loadJobs}
                    />
                  </div>
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
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applied-jobs" // New route for applied jobs
              element={
                <ProtectedRoute user={user}>
                  <AppliedJobs applications={applications} />
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
          </Routes>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
