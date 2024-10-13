import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const LoginPage = ({ user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (user?.email) {
    return <Navigate to="/" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center login">
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="login-form w-75">
            <h2 className="text-left mb-4">Login</h2>
            <Form>
              {/* Email Field */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup className="login">
                  <Form.Control type="email" placeholder="Email..." required />
                  <InputGroup.Text>
                    <i class="fa-solid fa-at"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup className="login">
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

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Submit
              </Button>

              {/* Forgot Password Link */}
              <div className="w-100 text-center">
                <Form.Text className="text-muted">
                  <a href="/register">New User? Sign Up here!</a>
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
            src="https://via.placeholder.com/600x400" // Replace this with your image path
            alt="Login Illustration"
            className="img-fluid"
          />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
