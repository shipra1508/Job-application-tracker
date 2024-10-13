import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Profile = ({ user, updateUser }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    skills: user.skills,
    experience: user.experience,
    address: user.address,
    mobile: user.mobile,
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Update user profile
      updateUser(formData);
      setShowSuccess(true); // Show success alert after update
    }
    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <h2>Profile</h2>
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          Profile updated successfully!
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formFullName" className="mb-3">
          <Form.Label column sm={2}>
            Full Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your full name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mb-3">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSkills" className="mb-3">
          <Form.Label column sm={2}>
            Skills
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            >
              <option>Select your skills</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your skills.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExperience" className="mb-3">
          <Form.Label column sm={2}>
            Experience (in years)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your experience in years.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAddress" className="mb-3">
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your address.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMobile" className="mb-3">
          <Form.Label column sm={2}>
            Mobile Number
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              pattern="[0-9]{10}"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid 10-digit mobile number.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
