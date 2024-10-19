// AddJob.js
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../firebase/config"; // Import your Firebase config
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import JobListing from "./JobListings";

const AddJob = ({ user, formatDateToYYYYMMDD }) => {
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: user.username,
    location: "",
    description: "",
    qualifications: "",
    workExperience: "",
    category: "",
    jobProfile: "",
    createdBy: user.id,
    dateCreated: formatDateToYYYYMMDD(new Date()),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    jobDetails.jobProfile =
      jobDetails.jobProfile.indexOf(",") !== -1
        ? jobDetails.jobProfile.split(",").map((detail) => detail.trim())
        : jobDetails.jobProfile;
    const dbRef = ref(db, "jobs"); // Reference to your jobs in Firebase
    await push(dbRef, jobDetails); // Push new job details to the database
    setJobDetails({
      // Reset the form
      title: "",
      company: "",
      location: "",
      description: "",
      qualifications: "",
      workExperience: "",
      category: "",
      jobProfile: "",
      createdBy: user.id,
      dateCreated: formatDateToYYYYMMDD(new Date()),
    });
    alert("Job added successfully!"); // Optional: Add a success message
  };

  useEffect(() => {
    if (user.role !== "company") {
      navigate("/");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="pt-5">
      <h2>Add Job</h2>
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
        Add Job
      </Button>
    </Form>
  );
};

export default AddJob;
