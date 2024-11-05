// EditUser.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, get, update } from "firebase/database";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const userRef = ref(db, `users/${id}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUserDetails(snapshot.val());
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(ref(db, `users/${id}`), userDetails);
    alert("User updated successfully!");
    navigate("/manage-users");
  };

  return (
    <div className="pt-5">
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={userDetails.role}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
