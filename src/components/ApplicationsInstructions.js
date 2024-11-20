// ApplicationsInstructions.js
import { Button } from "bootstrap";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const ApplicationsInstructions = ({ user }) => {
  return (
    <div className="pt-5">
      <h3 className="primary-color">Application Instructions</h3>
      {user.role === "user" ? (
        <div className="instructions">
          <br />
          <div>
            <h4>How to Register</h4>
            <p>To register for an account, please follow these steps:</p>
            <ol>
              <li>Click on the "Register" link on the homepage.</li>
              <li>
                Fill out the registration form with your personal details.
              </li>
              <li>
                Submit the form, and check your email for a verification link.
              </li>
              <li>Click on the link in your email to verify your account.</li>
              <li>Log in to your account to start applying for jobs.</li>
            </ol>
          </div>

          <div>
            <h4>How to Find Jobs</h4>
            <p>
              Once you have registered and logged into your account, you can
              find jobs by:
            </p>
            <ol>
              <li>
                Visiting the "Job Listings" page from the main navigation menu.
              </li>
              <li>
                Using filters to narrow down your search by category, location,
                or experience level.
              </li>
              <li>
                Browsing the list of available job postings to find
                opportunities that interest you.
              </li>
            </ol>
          </div>

          <div>
            <h4>How to Apply for Jobs</h4>
            <p>To apply for a job, follow these steps:</p>
            <ol>
              <li>
                Select the job you are interested in from the job listings.
              </li>
              <li>Read the job description and qualifications carefully.</li>
              <li>Click the "Apply Now" button on the job detail page.</li>
              <li>Fill out the application form with your information.</li>
              <li>Attach your resume and any other required documents.</li>
              <li>
                Submit your application. You will receive a confirmation email
                shortly after.
              </li>
            </ol>
          </div>

          <div>
            <h4>Tips for a Successful Application</h4>
            <ul>
              <li>Customize your resume for each job application.</li>
              <li>
                Write a tailored cover letter that highlights your skills and
                experiences relevant to the job.
              </li>
              <li>
                Follow up on your application if you haven't heard back after a
                week.
              </li>
              <li>
                Prepare for interviews by researching the company and practicing
                common interview questions.
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3">1. Add a New Job</Card.Title>
              <Card.Text>
                <strong>Step 1:</strong> Navigate to the “Jobs” section and
                select “Add Job.”
                <br />
                <strong>Step 2:</strong> Fill out the job form, including fields
                like job title, description, qualifications, location, salary,
                and deadline.
                <br />
                <strong>Step 3:</strong> Preview the job post and ensure all
                details are accurate.
                <br />
                <strong>Step 4:</strong> Click “Post Job” to make it visible to
                applicants. You can edit or delete the job posting at any time.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3">2. View Created Jobs</Card.Title>
              <Card.Text>
                <strong>Step 1:</strong> Go to the “Jobs” section and click on
                “My Job Posts.”
                <br />
                <strong>Step 2:</strong> You’ll see a list of all jobs you have
                posted.
                <br />
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3">3. Update Company Profile</Card.Title>
              <Card.Text>
                <strong>Step 1:</strong> Go to the “Profile” section to update
                your company information.
                <br />
                <strong>Step 2:</strong> Edit your company’s description, upload
                a logo, add a banner, and provide contact information.
                <br />
                <strong>Step 3:</strong> Save changes to ensure your profile is
                up-to-date for potential applicants to view.
                <br />
                <strong>Step 4:</strong> Regularly update your profile to
                reflect any new details or changes in company contact
                information.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default ApplicationsInstructions;
