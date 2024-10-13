import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const RegistrationPage = ({ user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (user?.email) {
    return <Navigate to="/" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <Form>
              {/* Name Field */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <InputGroup className="register">
                  <Form.Control type="text" placeholder="Name..." required />
                  <InputGroup.Text>
                    <i class="fa-solid fa-user"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Email Field */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup className="register">
                  <Form.Control type="email" placeholder="Email..." required />
                  <InputGroup.Text>
                    <i class="fa-solid fa-at"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password..."
                    required
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
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password..."
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
