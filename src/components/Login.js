import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";

const LoginPage = ({ user, setUser, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  if (user?.email) {
    return <Navigate to="/" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      formErrors.email = "Please enter a valid email";
    }

    if (!password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await loginUser(email, password);
      } catch (error) {
        setShowAlert(true); // Show alert if login fails
      }
    }
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

            {/* Alert for failed login */}
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                Invalid email or password. Please try again.
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Email Field */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup className="login">
                  <Form.Control
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email} // Highlight error
                    required
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-at"></i>
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup className="login">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password} // Highlight error
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
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
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
            src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-login-illustration-download-in-svg-png-gif-file-formats--security-protection-secure-smartphone-encrypted-phone-seo-ppc-pack-business-illustrations-4708053.png" // Replace this with your image path
            alt="Login Illustration"
            className="img-fluid"
          />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
