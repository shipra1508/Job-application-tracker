// ViewJobApplications.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { Table, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ScheduleJob from "./AddSchedule"; // Import ScheduleJob component

const ViewJobApplications = ({ user }) => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null); // State to store the job data
  const [showScheduleModal, setShowScheduleModal] = useState(false); // State for showing modal
  const [selectedApplication, setSelectedApplication] = useState(null); // State for selected application
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "company") {
      navigate("/");
      return;
    }

    // Fetch job details by job ID
    const jobRef = ref(db, `jobs/${jobId}`);
    onValue(jobRef, (snapshot) => {
      const jobData = snapshot.val();
      if (jobData) {
        setJob({ ...jobData, id: jobId });
      } else {
        console.error("Job not found");
      }
    });

    // Fetch applications for the selected job
    const applicationsRef = ref(db, "applications");
    onValue(applicationsRef, (snapshot) => {
      const applicationsData = [];
      snapshot.forEach((childSnapshot) => {
        const application = childSnapshot.val();
        if (application.jobid === jobId) {
          applicationsData.push(application);
        }
      });
      setApplications(applicationsData);
    });
  }, [user, navigate, jobId]);

  // Function to open schedule modal with selected application
  const handleScheduleInterview = (application) => {
    setSelectedApplication(application);
    setShowScheduleModal(true);
  };

  return (
    <div className="pt-5">
      <h2>Applications for Job: {job?.title || "Loading..."}</h2>
      {applications.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Preferred Skills</th>
              <th>Marital Status</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{app.username}</td>
                <td>{app.email}</td>
                <td>{app.experience} years</td>
                <td>{app.preferredSkills}</td>
                <td>{app.maritalStatus}</td>
                <td>
                  <a href={app.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleScheduleInterview(app)}
                  >
                    Schedule Interview
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No applications found for this job.</p>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedApplication && job && (
        <ScheduleJob
          user={user}
          job={job} // Pass fetched job details here
          setShowScheduleModal={setShowScheduleModal}
        />
      )}
    </div>
  );
};

export default ViewJobApplications;
