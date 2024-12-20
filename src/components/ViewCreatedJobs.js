// ViewCreatedJobs.js (Update the import and edit button section)
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, onValue, remove } from "firebase/database"; // Import remove for deleting
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewCreatedJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "company") {
      navigate("/");
      return;
    }

    const dbRef = ref(db, "jobs"); // Reference to your jobs in Firebase
    onValue(dbRef, (snapshot) => {
      const jobsData = [];
      snapshot.forEach((childSnapshot) => {
        const job = childSnapshot.val();
        job.id = childSnapshot.key; // Include the unique key for editing/deleting later
        if (job.createdBy === user.id) {
          jobsData.push(job); // Only add jobs created by the current user
        }
      });
      setJobs(jobsData);
    });
  }, [user, navigate]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await remove(ref(db, "jobs/" + jobId)); // Remove job from Firebase
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job: ", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  return (
    <div className="pt-5">
      <h2>View Created Jobs</h2>
      {jobs.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.description}</td>
                <td>
                  <button
                    onClick={() => navigate(`/view-applications/${job.id}`)}
                    className="btn btn-info w-100 mb-1"
                  >
                    View Applications{" "}
                    <em className="fa-solid fa-eye color-white"></em>
                  </button>
                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="btn btn-warning w-100 mb-1"
                  >
                    Edit <em class="fa-solid fa-pencil color-white"></em>
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="btn btn-danger w-100"
                  >
                    Delete <em class="fa-solid fa-trash color-white"></em>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No created jobs found.</p>
      )}
    </div>
  );
};

export default ViewCreatedJobs;
