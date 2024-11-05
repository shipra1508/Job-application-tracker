import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, onValue } from "firebase/database";
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
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="btn btn-warning w-100 mb-1"
                  >
                    Edit <i class="fa-solid fa-pencil color-white"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="btn btn-danger w-100"
                  >
                    Delete <i class="fa-solid fa-trash color-white"></i>
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

const handleDelete = async (jobId) => {
  // Implement delete functionality here
  // For example, you can call remove(ref(db, 'jobs/' + jobId))
  // to delete the job from Firebase
};

export default ViewCreatedJobs;
