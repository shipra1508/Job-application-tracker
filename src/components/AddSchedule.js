import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { db } from "../firebase/config";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ScheduleJob = ({ user, job, setShowScheduleModal }) => {
  const navigate = useNavigate();
  const [scheduleDate, setScheduleDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  // Format the date to YYYY-MM-DD
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate the form
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setErrorMessage("Please fill in all required fields.");
    } else {
      try {
        const newScheduleRef = push(ref(db, "schedules"));
        await set(newScheduleRef, {
          jobId: job.id,
          userId: user.id,
          companyId: job.createdBy,
          scheduleDate,
          status: "Scheduled",
          title: job.title,
          company: job.company,
          username: user.username,
        });
        setErrorMessage(""); // Clear any existing error messages
        setShowScheduleModal(false); // Close the modal after scheduling
      } catch (error) {
        setErrorMessage("Error scheduling job: " + error.message);
      }
    }
    setValidated(true);
  };

  return (
    <Modal
      show={true}
      onHide={() => setShowScheduleModal(false)}
      className="mt-5"
    >
      <Modal.Header closeButton>
        <Modal.Title>Schedule Interview for {job.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formScheduleDate">
            <Form.Label column sm={3}>
              Schedule Date
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select a valid date.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" className="mt-4">
              Schedule Interview
            </Button>
            <Button
              variant="danger"
              className="mt-4"
              onClick={() => setShowScheduleModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ScheduleJob;
