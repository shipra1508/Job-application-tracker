import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JobApplicationForm = ({ user, jobTitle, onSubmit }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    preferredSkills: "",
    maritalStatus: "",
    experience: user.experience,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <h2>Application Form for {jobTitle}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formFullName">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
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
              <option>Select Option</option>
              <option value="Web Development">Web Development</option>
              <option value="Front-End Development">
                Front-End Development
              </option>
              <option value="Back-End Development">Back-End Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
            </Form.Select>
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
              <option>Select Option</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExperience" className="mt-3">
          <Form.Label column sm={2}>
            Experience
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter your experience (in years)"
              required
            />
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
