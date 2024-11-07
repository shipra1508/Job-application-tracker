// AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <div className="pt-5">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="text-center">
            <Card.Img
              variant="top"
              src="https://img.freepik.com/free-vector/concept-image-upload-landing-page_23-2148298839.jpg  "
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              <Card.Text>
                Manage all users and their roles in the system.
              </Card.Text>
              <Link to="/manage-users" className="btn btn-primary">
                Go to User Management
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* You can add more sections as needed */}
    </div>
  );
};

export default AdminDashboard;
