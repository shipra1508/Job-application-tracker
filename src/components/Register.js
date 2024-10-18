import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { get, push, ref, set } from "firebase/database";

const RegistrationPage = ({ user, setUser, loginUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState("");
  const [validated, setValidated] = useState(false);

  if (user?.email) {
    return <Navigate to="/" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert("");

    // Basic validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.username.trim()) {
      setAlert("Please enter a name");
      return;
    }
    if (!emailRegex.test(form.email.trim())) {
      setAlert("Please enter a valid email");
      return;
    }
    if (form.password.length < 6) {
      setAlert("Password must be at least 6 characters long");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setAlert("Passwords do not match");
      return;
    }

    // Mark the form as validated
    setValidated(true);

    try {
      const newDocRef = push(ref(db, "users"));
      await set(newDocRef, {
        username: form.username,
        email: form.email,
        role: "user",
        password: form.password,
      });

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      await loginUser(form.email, form.password);
      if (user?.email && user?.id) {
        navigate("/");
      }
    } catch (error) {
      setAlert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="registration-form w-75">
            <h2 className="text-left mb-4">Register</h2>

            {alert && (
              <Alert variant="danger" className="w-100 p-2">
                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                {alert}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={onSubmit}>
              {/* Name Field */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type="text"
                    placeholder="Name..."
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    required
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-user"></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email Field */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type="email"
                    placeholder="Email..."
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-at"></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password..."
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    required
                    minLength={6}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                    ></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters long.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    required
                  />
                  <InputGroup.Text
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        showConfirmPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                    ></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Passwords must match.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Register
              </Button>

              {/* Already Registered Link */}
              <div className="w-100 text-center">
                <Form.Text className="text-muted">
                  Already have an account? <a href="/login">Login here!</a>
                </Form.Text>
              </div>
            </Form>
          </div>
        </Col>

        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            src="https://via.placeholder.com/600x400" // Replace with your image path
            alt="Registration Illustration"
            className="img-fluid"
          />
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationPage;
