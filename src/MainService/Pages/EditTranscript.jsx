import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const EditTranscripts = () => {
  const location = useLocation();
  const video = location.state.video;

  const [title, setTitle] = useState(video.title);
  const [transcript, setTranscript] = useState(""); // set this to video.transcript if it exists

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your code here to save the new title and transcript.

    console.log(title, transcript);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto px-4">
        <video
          src={video.mp4 || video.mp3}
          controls
          className="max-h-[150px] aspect-video"
        />
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <label>
            Transcript:
            <textarea value={transcript} onChange={handleTranscriptChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditTranscripts;
