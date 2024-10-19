import React, { useEffect, useState } from "react";
import { Card, Button, Container, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const JobListing = ({ jobs, handleApply, loadJobs, user }) => {
  // Add user prop
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [selectedJob, setSelectedJob] = useState(null); // To store selected job details
  const navigate = useNavigate(); // Initialize useNavigate

  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job
    setShowModal(true); // Open the modal
  };

  const handleClose = () => setShowModal(false); // Close the modal

  const handleApplyNow = () => {
    handleApply(selectedJob); // Set the selected job in App component
    navigate("/apply"); // Navigate to the application form
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <Container className="w-100 h-75 px-0">
      {jobs.map((job, index) => (
        <Card className="mb-4" key={index}>
          <Card.Body>
            <Card.Title>
              {job.title} - {job.company}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {job.location}
            </Card.Subtitle>
            <Card.Text>{job.description}</Card.Text>
            {/* Conditionally render the Apply button based on user role */}
            {user.role !== "company" && (
              <Button variant="primary" onClick={() => handleApplyClick(job)}>
                Apply
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}

      {/* Modal for viewing job details */}
      {selectedJob && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Apply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Job Title: {selectedJob.title}</h5>
            <p>
              <strong>Job Description:</strong> {selectedJob.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p>
              <strong>Company:</strong> {selectedJob.company}
            </p>
            <p>
              <strong>Qualifications:</strong> {selectedJob.qualifications}
            </p>
            <p>
              <strong>Work Experience:</strong> {selectedJob.workExperience}
            </p>
            <h6>Job Profile:</h6>
            <ul>
              {selectedJob.jobProfile.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* Conditionally render Apply Now button based on user role */}
            {user.role !== "company" && (
              <Button variant="primary" onClick={handleApplyNow}>
                Apply Now
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default JobListing;
