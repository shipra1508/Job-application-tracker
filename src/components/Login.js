import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <div className="p-5 w-100 h-100 d-flex justify-content-around align-items-center">
      <div className="h-75 width-35">
        <h1 className="primary-color">LOGIN</h1>

        <br />
        <br />

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email..."
            className="form-border"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="Password"
            placeholder="Password..."
            className="form-border"
          />
        </Form.Group>

        <br />

        <div className="w-100 d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            className="border-0 mb-3 w-75 m-auto bg-primary-color"
          >
            Submit
          </Button>
        </div>

        <Card.Link
          href="/register"
          className="primary-color mt-3 w-100 d-flex justify-content-center align-items-center"
        >
          Forgot Password
        </Card.Link>
      </div>
      <div>
        <img src="/img/Login.png" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
