import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AppliedJobs = ({ applications, viewAllAppliedJobs }) => {
  useEffect(() => {
    viewAllAppliedJobs();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Applied Jobs</h2>
      <Row>
        {applications.map((job, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>
                  {job.description || "Description not available"}
                </Card.Text>
                <Card.Text>
                  <strong>Experience: </strong>
                  {job.experience || "N/A"}
                </Card.Text>
                <Card.Text>
                  <strong>Status: </strong>
                  {job.status || "Applied"}
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">
                    {job.dateApplied || "Date not specified"}
                  </small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AppliedJobs;
