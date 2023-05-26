import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'; 
import TestVideo from "../assets/TestVideo.mp4";
import "./VideoPlayer.css"

function VideoPlayer(){
    return (
      <div className='video-player-container '>
        <Video 
            className="video-player"  // Add this line
            loop 
            muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="https://i.ytimg.com/vi/kMvPtA8GL9I/maxresdefault.jpg"
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src= {TestVideo} type="video/webm" />
            <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
        </Video>
        </div>
    );
}

export default VideoPlayer
