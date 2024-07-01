import { useState, useEffect } from "react";
import NoteCounter from "./NoteCounter";
import Diary from "./Diary";
import SpeechToText from "./TalkingArea";
import "./Diary-bacheca.css";

const API_URL = import.meta.env.VITE_API_URL;

const tagsList = [
  "relationship",
  "love",
  "loneliness",
  "friendship",
  "work",
  "health",
  "family",
  "happiness",
  "sadness",
  "anxiety",
  "motivation",
  "success",
  "failure",
  "personal growth",
  "education",
  "travel",
  "hobbies",
  "pets",
  "fitness",
  "diet",
];

const getRandomColor = () => {
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const DiaryBacheca = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showSpeechToText, setShowSpeechToText] = useState(false);
  const [latestMood, setLatestMood] = useState("");
  const [sentenceOfTheDay, setSentenceOfTheDay] = useState("");
  const [isExpandedDate, setIsExpandedDate] = useState(false);
  const [searchOptionVisible, setSearchOptionVisible] = useState(false);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagPage, setTagPage] = useState(1);
  const [tagHasMore, setTagHasMore] = useState(true);

  useEffect(() => {
    if (!selectedTag) {
      fetchNotes(page);
    } else {
      fetchFilteredNotes(selectedTag, tagPage);
    }
  }, [page, tagPage]);

  useEffect(() => {
    fetchLatestMood();
    fetchSentenceOfTheDay();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setTagPage(1);
      setFilteredNotes([]);
      fetchFilteredNotes(selectedTag, 1);
    }
  }, [selectedTag]);

  const fetchNotes = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
        //use navigate
      }

      const response = await fetch(
        `${API_URL}/api/notes/private?page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data = await response.json();
      setNotes(() => [...data]);
      if (data.length < 4) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchLatestMood = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/api/moods/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch latest mood: ${response.statusText}`);
      }

      const moodData = await response.json();
      setLatestMood(moodData.mood);
    } catch (error) {
      console.error("Error fetching latest mood:", error);
    }
  };

  const fetchSentenceOfTheDay = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${API_URL}/api/sentences/sentence-of-the-day`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch sentence of the day: ${response.statusText}`
        );
      }

      const sentenceData = await response.json();
      setSentenceOfTheDay(sentenceData.text);
    } catch (error) {
      console.error("Error fetching sentence of the day:", error);
    }
  };

  const fetchFilteredNotes = async (tag, page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${API_URL}/api/notes/private?tag=${tag}&page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch filtered notes: ${response.statusText}`
        );
      }

      const data = await response.json();
      setFilteredNotes((prevNotes) =>
        page === 1 ? data : [...prevNotes, ...data]
      );
      if (data.length < 4) {
        setTagHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching filtered notes:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setFilteredNotes((prevFilteredNotes) =>
        prevFilteredNotes.filter((note) => note._id !== noteId)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLoadMore = () => {
    if (selectedTag) {
      setTagPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleWriteNoteClick = () => {
    setShowDiary(true);
    setShowSpeechToText(false);
  };

  const handleDictateNoteClick = () => {
    setShowDiary(false);
    setShowSpeechToText(true);
  };

  const toggleExpandDate = () => {
    setIsExpandedDate(!isExpandedDate);
  };

  const handleSearchClick = () => {
    setSearchOptionVisible(!searchOptionVisible);
    setSelectedSearchOption(null);
    setFilteredNotes([]);
  };

  const handleSearchByTagClick = () => {
    setSelectedSearchOption("tag");
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const currentDate = new Date().toLocaleDateString();

  const notesToDisplay = selectedTag ? filteredNotes : notes;

  return (
    <div className="diary-bacheca">
      <div className="top-row">
        <div
          className={`how-it-works-container ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <p>
              Welcome to your personal diary dashboard. Here you view your
              private notes, add new entries, and manage your diary. Click on a
              note to expand it and see more details or collapse it to see less.
              Use the "Load More" button to fetch additional notes.
            </p>
          ) : (
            <p>How it Works</p>
          )}
        </div>
        <NoteCounter count={notes.length} />
      </div>
      <div className="content-row">
        <div className="left-section">
          <div className="info-container">
            <div
              className={`info-box-date ${isExpandedDate ? "expanded1" : ""}`}
              onClick={toggleExpandDate}
            >
              {isExpandedDate ? (
                <p>{sentenceOfTheDay}</p>
              ) : (
                <p>{currentDate}</p>
              )}
            </div>

            <div className="info-box-mood">
              Latest Mood:{" "}
              <span className="latest-mood-span">{latestMood}</span>
            </div>
          </div>
          <div className="note-buttons">
            <button onClick={handleWriteNoteClick}>Write a Note</button>
            <button onClick={handleDictateNoteClick}>Dictate a Note</button>
          </div>
          {showDiary && <Diary />}
          {showSpeechToText && <SpeechToText />}
        </div>
        <div className="right-section">
          <div className="search-container">
            <button onClick={handleSearchClick}>Search</button>
            {searchOptionVisible && (
              <div
                className={`search-options ${
                  searchOptionVisible ? "visible" : ""
                }`}
              >
                <button onClick={handleSearchByTagClick}>Search by Tag</button>
                <button onClick={() => setSelectedSearchOption("keyword")}>
                  Search by Keyword
                </button>
              </div>
            )}
            {selectedSearchOption === "tag" && (
              <div className="tags-list visible">
                {tagsList.map((tag, index) => (
                  <div
                    key={index}
                    className={`tag ${selectedTag === tag ? "selected" : ""}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="notes-wrapper">
            <div className="notes-container">
              {notesToDisplay.map((note) => (
                <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
              ))}
              {(selectedTag ? tagHasMore : hasMore) ? (
                <button onClick={handleLoadMore} className="load-more-button">
                  Load More
                </button>
              ) : (
                <p className="no-more-notes">All notes loaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoteCard = ({ note, deleteNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const shortContent = note.content.substring(0, 30);
  const content = isExpanded ? note.content : `${shortContent}...`;
  const color = getRandomColor();

  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div className="note-date">
        {new Date(note.date).toLocaleDateString()}
      </div>
      <div className="note-content">
        {content}
        <div className="tags-container">
          {note.tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
            </div>
          ))}
        </div>
        <button
          onClick={() => deleteNote(note._id)}
          className="delete-button"
        ></button>
      </div>
      <button onClick={toggleExpand} className="note-button">
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default DiaryBacheca;
