import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/config";
import { ref, push, set } from "firebase/database";

const JobApplicationForm = ({
  user,
  selectedJob,
  onSubmit,
  categories,
  formatDateToYYYYMMDD,
}) => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    preferredSkills: "",
    maritalStatus: "",
    experience: user.experience,
    resume: "",
  });

  const [validated, setValidated] = useState(false); // State for form validation
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(""); // Clear error message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate form
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setErrorMessage("Please fill in all required fields correctly.");
    } else {
      const newDocRef = push(ref(db, "applications"));
      await set(newDocRef, {
        userid: user.id,
        jobid: selectedJob.id,
        title: selectedJob.title,
        description: selectedJob.description,
        username: formData.username,
        email: formData.email,
        experience: formData.experience,
        preferredSkills: formData.preferredSkills,
        maritalStatus: formData.maritalStatus,
        status: "Applied",
        dateApplied: formatDateToYYYYMMDD(new Date()),
        resume: formData.resume,
      });

      setErrorMessage(""); // Clear error message if valid
      onSubmit(formData); // Submit the form data
      navigate("/"); // Navigate after successful submission
    }

    setValidated(true); // Set validated state
  };

  return (
    <Container className="mt-5">
      <h2>Application Form for {selectedJob.title}</h2>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formFullName">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your full name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mt-3">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPreferredSkills" className="mt-3">
          <Form.Label column sm={2}>
            Preferred Skills
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="preferredSkills"
              value={formData.preferredSkills}
              onChange={handleChange}
              required
            >
              <option value="">Select Option</option>
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your preferred skills.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMaritalStatus" className="mt-3">
          <Form.Label column sm={2}>
            Marital Status
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Option</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your marital status.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExperience" className="mt-3">
          <Form.Label column sm={2}>
            Experience
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter your experience (in years)"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your experience in years.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formResume" className="mt-3">
          <Form.Label column sm={2}>
            Resume URL
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              placeholder="Upload your resume"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please upload your resume.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default JobApplicationForm;
