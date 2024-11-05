// ApplicationsInstructions.js
import React from "react";

const ApplicationsInstructions = () => {
  return (
    <div className="pt-5">
      <h2 className="primary-color">Application Instructions</h2>
      <div className="instructions">
        <br />
        <div>
          <h4>How to Register</h4>
          <p>To register for an account, please follow these steps:</p>
          <ol>
            <li>Click on the "Register" link on the homepage.</li>
            <li>Fill out the registration form with your personal details.</li>
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
            Once you have registered and logged into your account, you can find
            jobs by:
          </p>
          <ol>
            <li>
              Visiting the "Job Listings" page from the main navigation menu.
            </li>
            <li>
              Using filters to narrow down your search by category, location, or
              experience level.
            </li>
            <li>
              Browsing the list of available job postings to find opportunities
              that interest you.
            </li>
          </ol>
        </div>

        <div>
          <h4>How to Apply for Jobs</h4>
          <p>To apply for a job, follow these steps:</p>
          <ol>
            <li>Select the job you are interested in from the job listings.</li>
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
    </div>
  );
};

export default ApplicationsInstructions;
