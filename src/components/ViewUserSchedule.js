import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue, update } from "firebase/database";
import { Card, Col, Row } from "react-bootstrap";

const UserSchedule = ({ userId, schedules, setSchedules }) => {
  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    onValue(schedulesRef, (snapshot) => {
      const schedulesData = snapshot.val();
      const userSchedules = [];
      for (let id in schedulesData) {
        if (schedulesData[id].userId === userId) {
          const schedule = schedulesData[id];
          // Check if the schedule date has passed and update the status
          const today = new Date();
          const scheduleDate = new Date(schedule.scheduleDate);

          // If the interview date has passed, update status to "Completed"
          if (scheduleDate < today) {
            schedule.status = "Completed";
            // Optionally update the status in the database
            update(ref(db, `schedules/${id}`), { status: "Completed" });
          }

          userSchedules.push(schedule);
        }
      }
      setSchedules(userSchedules);
    });
  }, [userId]);

  return (
    <div className="pt-5">
      <h2>Your Scheduled Interviews</h2>
      <Row>
        {schedules.length === 0 ? (
          <p>No upcoming interviews.</p>
        ) : (
          schedules.map((schedule, index) => (
            <Col md={6} key={index}>
              <Card className="px-5 pt-5 pb-1 mb-3">
                <Card.Title>Job: {schedule.title}</Card.Title>
                <Card.Body>
                  <p>Company: {schedule.company}</p>
                  <p>Scheduled on: {schedule.scheduleDate}</p>
                  <p>Status: {schedule.status}</p>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default UserSchedule;
