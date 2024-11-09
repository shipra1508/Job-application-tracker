// UserSchedule.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue, update } from "firebase/database";
import { Card, Modal, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar's CSS

const UserSchedule = ({ userId }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [selectedSchedules, setSelectedSchedules] = useState([]); // Schedules on selected date
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    onValue(schedulesRef, (snapshot) => {
      const schedulesData = snapshot.val();
      const userSchedules = [];
      for (let id in schedulesData) {
        if (schedulesData[id].userId === userId) {
          const schedule = schedulesData[id];
          const today = new Date();
          const scheduleDate = new Date(schedule.scheduleDate);

          // If the interview date has passed, update status to "Completed"
          if (scheduleDate < today) {
            schedule.status = "Completed";
            update(ref(db, `schedules/${id}`), { status: "Completed" });
          }
          userSchedules.push({ ...schedule, id });
        }
      }
      setSchedules(userSchedules);
    });
  }, [userId]);

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };     

  // Handle selecting a date on the calendar
  const handleDateClick = (date) => {
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(date);
  
    setSelectedDate(date);
    const schedulesForDate = schedules.filter(
      (schedule) => schedule.scheduleDate === formattedCurrentDate
    );
    setSelectedSchedules(schedulesForDate);
    setShowModal(true);
  };

  // Highlight dates with interviews on the calendar
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      return schedules.some((schedule) => schedule.scheduleDate === dateString)
        ? "highlight"
        : null;
    }
  };

  return (
    <div className="pt-5">
      <h2>Your Scheduled Interviews</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />

      {/* Modal to show interviews on the selected date */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Interviews on {selectedDate?.toDateString()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSchedules.length > 0 ? (
            selectedSchedules.map((schedule) => (
              <Card key={schedule.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{schedule.title}</Card.Title>
                  <p>Company: {schedule.company}</p>
                  <p>Status: {schedule.status}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No interviews scheduled for this date.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserSchedule;
