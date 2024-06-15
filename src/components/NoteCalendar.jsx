import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import "./note-calendar.css";
// import NoteIcon from "../assets/note-icon.png";

const NoteCalendar = () => {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notesForDate, setNotesForDate] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/notes`);
        const data = await response.json();
        console.log("Fetched notes:", data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateNotes = Array.isArray(notes)
      ? notes.filter(
          (note) => new Date(note.date).toDateString() === date.toDateString()
        )
      : [];
    setNotesForDate(dateNotes);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateNotes = Array.isArray(notes)
        ? notes.filter(
            (note) => new Date(note.date).toDateString() === date.toDateString()
          )
        : [];
      if (dateNotes.length > 0) {
        return <img src={NoteIcon} alt="Note Icon" className="note-icon" />;
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <textarea placeholder="Write your note here..."></textarea>
      <Calendar onClickDay={handleDateClick} tileContent={tileContent} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notes Modal"
        className="notes-modal"
        overlayClassName="notes-modal-overlay"
      >
        <h3>Notes for {selectedDate?.toDateString()}</h3>
        {notesForDate.length > 0 ? (
          <ul>
            {notesForDate.map((note) => (
              <li key={note._id}>{note.content}</li>
            ))}
          </ul>
        ) : (
          <p>No notes for this date.</p>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default NoteCalendar;
