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

const App = () => {
  const [user, setUser] = useState({});

  // Function to update user profile
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
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

  // Initial job listings with detailed job information
  const initialJobs = [
    {
      title: "Software Developer",
      company: "Amazon",
      location: "Hyderabad",
      category: "Web Development",
      description: "AWS Utility Computing (UC) provides product innovations...",
      qualifications: "BCA, MCA",
      workExperience: "2-4 Yrs in Software Development",
      jobProfile: [
        "Hands-on experience in design using object-oriented programming principles.",
        "Strong understanding of object-oriented programming.",
        "Familiarity with Microsoft SQL Server.",
        "Experience with popular web application frameworks.",
        "Understanding of fundamental design principles for building a scalable application.",
      ],
    },
    {
      title: "UI Engineer II",
      company: "Flipkart",
      location: "Chennai",
      category: "Web Development",
      description: "The scale at which Flipkart operates...",
      qualifications: "B.E, B.Tech",
      workExperience: "3-5 Yrs in Frontend Development",
      jobProfile: [
        "Expertise in modern JavaScript frameworks like React.",
        "Strong UI/UX design skills.",
        "Experience with REST APIs and integrating frontend with backend systems.",
      ],
    },
    {
      title: "Data Scientist",
      company: "Google",
      location: "Bangalore",
      category: "Data Science",
      description: "Data science innovations at Google...",
      qualifications: "M.Sc in Statistics, Computer Science",
      workExperience: "2-5 Yrs in Data Science",
      jobProfile: [
        "Expertise in statistical analysis and machine learning.",
        "Experience with Python, R, and data visualization tools.",
        "Strong background in SQL and data management.",
      ],
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Pune",
      category: "Machine Learning",
      description: "Developing scalable backend systems...",
      qualifications: "B.E in Computer Science",
      workExperience: "4-6 Yrs in Backend Development",
      jobProfile: [
        "Experience with distributed systems and cloud computing.",
        "Proficiency in C#, .NET, and Azure.",
        "Familiarity with microservices architecture.",
      ],
    },
  ];

  const categories = [...new Set(initialJobs.map((job) => job.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
          title: "Full Stack Developer",
          company: "Facebook",
          location: "Mumbai",
          category: "Web Development",
          description: "Build dynamic web applications...",
          qualifications: "B.Tech, M.Tech",
          workExperience: "3-5 Yrs in Full Stack Development",
          jobProfile: [
            "Expertise in React, Node.js, and MongoDB.",
            "Strong understanding of both frontend and backend development.",
          ],
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
                      jobs={filteredJobs}
                      handleApply={handleApply} // Pass filtered jobs
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
                    jobTitle={selectedJob?.title || ""}
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
