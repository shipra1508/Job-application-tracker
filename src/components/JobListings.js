import React, { useEffect, useState } from "react";
import { Card, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AddSchedule from "./AddSchedule";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebase/config";

const JobListing = ({
  jobs,
  handleApply,
  loadJobs,
  user,
  schedules,
  setSchedules,
  applications,
}) => {
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [showScheduleModal, setShowScheduleModal] = useState(false); // Modal for scheduling
  const [selectedJob, setSelectedJob] = useState(null); // To store selected job details
  const navigate = useNavigate(); // Initialize useNavigate

  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job
    setShowModal(true); // Open the modal
  };

  const handleScheduleClick = (job) => {
    setSelectedJob(job); // Set the selected job
    setShowScheduleModal(true); // Open schedule modal
  };

  const handleClose = () => {
    setShowModal(false);
    setShowScheduleModal(false); // Close both modals
  };

  const handleApplyNow = () => {
    handleApply(selectedJob); // Set the selected job in App component
    navigate("/apply"); // Navigate to the application form
  };

  // Check if job is already scheduled for the user
  const isJobScheduled = (jobId) => {
    return schedules?.some(
      (schedule) => schedule.jobId === jobId && schedule.status === "Scheduled"
    );
  };

  // Check if job is already applied by the user
  const isJobApplied = (jobId) => {
    console.log(applications);
    return (
      applications?.filter(
        (application) =>
          application.jobid === jobId && application.userid === user.id
      ).length > 0
    );
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    onValue(schedulesRef, (snapshot) => {
      const schedulesData = snapshot.val();
      const userSchedules = [];
      for (let id in schedulesData) {
        if (schedulesData[id].userId === user.id) {
          const schedule = schedulesData[id];
          // Check if the schedule date has passed and update the status
          const today = new Date();
          const scheduleDate = new Date(schedule.scheduleDate);

          // If the interview date has passed, update status to "Completed"
          if (scheduleDate < today) {
            schedule.status = "Completed";
            // Optionally update the status in the database
            update(ref(db, `schedules/${id}`), { status: "Completed" });
          }

          userSchedules.push(schedule);
        }
      }
      setSchedules(userSchedules);
    });
  }, [user.id]);

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

            {/* Conditionally render the Apply button or "Applied" if already applied */}
            {user.role === "user" &&
              !isJobApplied(job.id) &&
              !isJobScheduled(job.id) && (
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={() => handleApplyClick(job)}
                >
                  <i class="fa-solid fa-pen-alt me-2" />
                  Apply
                </Button>
              )}

            {/* Show 'Applied' if the user has already applied */}
            {user.role === "user" && isJobApplied(job.id) && (
              <Button variant="secondary" className="me-3" disabled>
                <i class="fa-solid fa-check-circle me-2" />
                Applied
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
