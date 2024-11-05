// EditJob.js
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, get, update } from "firebase/database"; // Import update for editing
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { jobId } = useParams(); // Get the job ID from the URL parameters
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    qualifications: "",
    workExperience: "",
    category: "",
    jobProfile: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const dbRef = ref(db, "jobs/" + jobId);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setJobDetails(snapshot.val());
      } else {
        console.error("No job found!");
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRef = ref(db, "jobs/" + jobId);
    await update(dbRef, jobDetails); // Update job details in Firebase
    alert("Job updated successfully!");
    navigate("/created-jobs"); // Redirect after update
  };

  return (
    <Form onSubmit={handleSubmit} className="pt-5">
      <h2>Edit Job</h2>
      <Form.Group controlId="formTitle">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={jobDetails.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={jobDetails.company}
          onChange={handleChange}
          required
          disabled
        />
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={jobDetails.location}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={jobDetails.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formQualifications">
        <Form.Label>Qualifications</Form.Label>
        <Form.Control
          type="text"
          name="qualifications"
          value={jobDetails.qualifications}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formWorkExperience">
        <Form.Label>Work Experience</Form.Label>
        <Form.Control
          type="text"
          name="workExperience"
          value={jobDetails.workExperience}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={jobDetails.category}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formJobProfile">
        <Form.Label>Job Profile</Form.Label>
        <Form.Control
          type="text"
          name="jobProfile"
          value={jobDetails.jobProfile}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className="bg-primary-color border-0 mt-3 w-25" type="submit">
        Update Job
      </Button>
    </Form>
  );
};

export default EditJob;
