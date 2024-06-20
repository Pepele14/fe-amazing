const NoteCounter = ({ count }) => {
  return (
    <div className="note-counter">
      <p>
        Total Notes: <span style={{ color: "#fd7e14" }}>{count}</span>
      </p>
    </div>
  );
};

export default NoteCounter;
