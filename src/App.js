import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routing/ProtectedRoute";
import { Col, Row } from "react-bootstrap";
import Header from "./components/Header";
import JobListings from "./components/JobListings";

const App = () => {
  const [user, setUser] = useState({ email: "eswar@gmail.com" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initial job listings (add more for testing)
  const initialJobs = [
    {
      title: "Software Developer",
      company: "Amazon",
      location: "Hyderabad",
      category: "Web Development",
      description: "AWS Utility Computing (UC) provides product innovations...",
    },
    {
      title: "UI Engineer II",
      company: "Flipkart",
      location: "Chennai",
      category: "Web Development",
      description: "The scale at which Flipkart operates...",
    },
    {
      title: "Data Scientist",
      company: "Google",
      location: "Bangalore",
      category: "Data Science",
      description: "Data science innovations at Google...",
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Pune",
      category: "Machine Learning",
      description: "Developing scalable backend systems...",
    },
    // Add more jobs here
  ];

  const categories = [...new Set(initialJobs.map((job) => job.category))];

  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [hasMore, setHasMore] = useState(true); // Tracks if there are more jobs to load

  // Filter jobs based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredJobs(jobs.filter((job) => job.category === selectedCategory));
    } else {
      setFilteredJobs(jobs); // Show all jobs if no category is selected
    }
  }, [selectedCategory, jobs]);

  // Simulate an API call to load more jobs
  const loadMoreJobs = () => {
    setTimeout(() => {
      const moreJobs = [
        {
          title: "Software Developer",
          company: "Amazon",
          location: "Hyderabad",
          category: "Web Development",
          description:
            "AWS Utility Computing (UC) provides product innovations...",
        },
        {
          title: "UI Engineer II",
          company: "Flipkart",
          location: "Chennai",
          category: "Web Development",
          description: "The scale at which Flipkart operates...",
        },
        {
          title: "Data Scientist",
          company: "Google",
          location: "Bangalore",
          category: "Data Science",
          description: "Data science innovations at Google...",
        },
        {
          title: "Backend Developer",
          company: "Microsoft",
          location: "Pune",
          category: "Machine Learning",
          description: "Developing scalable backend systems...",
        },
      ];

      // Simulate end of data by conditionally loading more
      if (jobs.length >= 10) {
        setHasMore(false); // No more jobs to load after 10 items
      } else {
        setJobs([...jobs, ...moreJobs]);
      }
    }, 1500); // Simulating delay
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
              element={<Register user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
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
                      loadMoreJobs={loadMoreJobs}
                      hasMore={hasMore}
                      jobs={filteredJobs} // Pass filtered jobs
                    />
                  </div>
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
