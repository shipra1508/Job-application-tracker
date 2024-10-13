import React from "react";
import { Card, Container } from "react-bootstrap";

const Profile = () => {
  return (
    <Container className="mt-4 w-100">
      <Card>
        <Card.Body>
          <Card.Title>Pavan</Card.Title>
          <Card.Text>Email: pavan@gmail.com</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
