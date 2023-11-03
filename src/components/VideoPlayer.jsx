import React from 'react';
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import TestVideo from "../assets/Demoooo.mp4";
import Demo_Photo from "../assets/demo_photo.png";
import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <div className="video-player-container">
      <Video
        autoPlay // this attempts to play the video as soon as it can
        muted // this is often required for autoplay to work
        loop
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        poster={Demo_Photo}
        className="video-player"
      >
        <source src={TestVideo} type="video/mp4" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://source.vtt"
          default
        />
      </Video>
    </div>
  );
}

export default VideoPlayer;
