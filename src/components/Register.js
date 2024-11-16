import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { get, push, ref, set } from "firebase/database";

const RegistrationPage = ({ user, setUser, loginUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    role: "user", // Default role set to 'user'
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
    if (!form.experience.trim()) {
      setAlert("Please enter your experience");
      return;
    }

    // Mark the form as validated
    setValidated(true);

    try {
      // Check if the email already exists in the Firebase database
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);
      const usersData = snapshot.val();
      const emailExists = Object.values(usersData || {}).some(
        (user) => user.email === form.email
      );

      if (emailExists) {
        setAlert("Email is already in use. Please choose another one.");
        return; // Exit the function if email is already taken
      }

      const newDocRef = push(ref(db, "users"));
      await set(newDocRef, {
        username: form.username,
        email: form.email,
        role: form.role, // Save selected role
        password: form.password,
        experience: form.experience,
      });

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        experience: "",
        role: "user", // Reset role to default
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
                <em className="fa-solid fa-triangle-exclamation me-2"></em>
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
                    <em className="fa-solid fa-user"></em>
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
                    <em className="fa-solid fa-at"></em>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Role Field */}
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="company">Company</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a role.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Experience Field */}
              <Form.Group className="mb-3" controlId="formExperience">
                <Form.Label>
                  {form.role === "company" ? "Company Overview" : "Experience"}
                </Form.Label>
                <InputGroup className="register">
                  <Form.Control
                    type="text"
                    placeholder={
                      form.role === "company"
                        ? "Overview of your company..."
                        : "Experience..."
                    }
                    name="experience"
                    value={form.experience}
                    onChange={onChange}
                    required
                  />
                  <InputGroup.Text>
                    <em className="fa-solid fa-briefcase"></em>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please enter your experience.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Skills Field - only for users */}
              {form.role === "user" && (
                <Form.Group className="mb-3" controlId="formSkills">
                  <Form.Label>Skills</Form.Label>
                  <InputGroup className="register">
                    <Form.Control
                      type="text"
                      placeholder="Skills..."
                      name="skills"
                      onChange={onChange}
                      required
                    />
                    <InputGroup.Text>
                      <em className="fa-solid fa-star"></em>
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter your skills.
                  </Form.Control.Feedback>
                </Form.Group>
              )}

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
                    <em
                      className={
                        showPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                    ></em>
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
                    <em
                      className={
                        showConfirmPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                    ></em>
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
                  Already have an account? <Link to="/login">Login here!</Link>
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
            src="https://cdni.iconscout.com/illustration/premium/thumb/job-application-form-illustration-download-in-svg-png-gif-file-formats--applying-for-available-hiring-new-employees-business-marketing-pack-illustrations-4874298.png" // Replace with your image path
            alt="job application form illustration"
            className="img-fluid"
          />
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationPage;
