import React from "react";
import { Link } from "react-router-dom";
import Timeline from "react-vertical-timeline-component";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const CustomTimeline = ({ notes }) => {
  // Check if notes data is undefined or empty
  if (!notes || notes.length === 0) {
    return <div>No notes available</div>;
  }

  return (
    <Timeline lineColor={"#ddd"}>
      {notes.map((group) => (
        <Timeline.Item key={group.date} dateText={group.date}>
          {group.notes.map((note) => (
            <div key={note._id}>
              <p>{note.content}</p>
              <Link to={`/private/${note._id}`}>View Note</Link>
            </div>
          ))}
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default CustomTimeline;
