import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { db } from "../firebase/config";
import { ref, update } from "firebase/database";

const Profile = ({ user, updateUser }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    skills: user.skills || "",
    experience: user.experience || "",
    role: user.role || "user", // Add role to form data
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const userRef = ref(db, `users/${user.id}`);
        await update(userRef, {
          username: formData.username,
          email: formData.email,
          experience: formData.experience,
          skills: formData.role === "user" ? formData.skills : null, // Convert skills to an array only if role is user
        });

        updateUser(formData); // Update user context or state
        setShowSuccess(true);
      } catch (error) {
        console.error("Error saving profile: ", error);
      }
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
              name="username"
              value={formData.username}
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

        {/* Skills Field - only for users */}
        {formData.role === "user" && (
          <Form.Group as={Row} controlId="formSkills" className="mb-3">
            <Form.Label column sm={2}>
              Skills
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter skills (comma separated)"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide valid skills.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        )}

        {/* Experience Field */}
        <Form.Group as={Row} controlId="formExperience" className="mb-3">
          <Form.Label column sm={2}>
            {formData.role === "company"
              ? "Company Overview"
              : "Experience (in years)"}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder={
                formData.role === "company"
                  ? "Overview of your company..."
                  : "Enter years of experience"
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              {formData.role === "company"
                ? "Please provide a company overview."
                : "Please provide your experience in years."}
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
