// ManageUsers.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, onValue, remove } from "firebase/database";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(db, "users"); // Reference to the users in Firebase
    onValue(usersRef, (snapshot) => {
      const usersList = [];
      snapshot.forEach((childSnapshot) => {
        const user = { id: childSnapshot.key, ...childSnapshot.val() };
        usersList.push(user);
      });
      setUsers(usersList);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await remove(ref(db, `users/${id}`)); // Remove the user from Firebase
      setUsers(users.filter((user) => user.id !== id)); // Update state to reflect the deletion
      alert("User deleted successfully!");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`); // Navigate to edit user page
  };

  return (
    <div className="pt-5">
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role !== "admin")
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit <em class="fa-solid fa-pencil color-white"></em>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                    className="ml-2"
                  >
                    Delete <em class="fa-solid fa-trash color-white"></em>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
