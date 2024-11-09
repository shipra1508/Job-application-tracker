// CompanySchedule.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue, update } from "firebase/database";
import { Card, Modal, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

const CompanySchedule = ({ companyId }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [selectedSchedules, setSelectedSchedules] = useState([]); // Schedules on selected date
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const schedulesRef = ref(db, "schedules");
    onValue(schedulesRef, (snapshot) => {
      const schedulesData = snapshot.val();
      const companySchedules = [];
      for (let id in schedulesData) {
        if (schedulesData[id].companyId === companyId) {
          const schedule = schedulesData[id];
          const today = new Date();
          const scheduleDate = new Date(schedule.scheduleDate + "T00:00:00"); // Set time to midnight

          // Update status to "Completed" if the interview date has passed
          if (scheduleDate < today) {
            schedule.status = "Completed";
            update(ref(db, `schedules/${id}`), { status: "Completed" });
          }
          companySchedules.push({ ...schedule, id });
        }
      }
      setSchedules(companySchedules);
    });
  }, [companyId]);

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {

    return date.toDateString().split("T")[0];
  };     

  // Handle selecting a date on the calendar
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateString = formatDate(date);
    const schedulesForDate = schedules.filter(
      (schedule) => schedule.scheduleDate === dateString
    );
    setSelectedSchedules(schedulesForDate);
    setShowModal(true);
  };

  // Highlight dates with interviews on the calendar
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = formatDate(date);
      return schedules.some((schedule) => schedule.scheduleDate === dateString)
        ? "highlight"
        : null;
    }
  };

  return (
    <div className="pt-5">
      <h2>Scheduled Interviews</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        className="w-100 h-100"
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
                  <p>User: {schedule.username}</p>
                  <p>Scheduled on: {schedule.scheduleDate}</p>
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

export default CompanySchedule;
