import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";

const Processing = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showDirectOptions, setShowDirectOptions] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const threeDottedButtonRefs = useRef({});

  const handleDirectVideoOptions = (videoId) => {
    setSelectedVideoId(videoId);
    setShowDirectOptions(!showDirectOptions);
  };

  const handleEditVideoOptions = (videoId) => {
    setSelectedVideoId(videoId);
    setShowEditOptions(!showEditOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://140.119.19.16:8001/tasks/?n=10&page=1');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;
      for (const ref of Object.values(threeDottedButtonRefs.current)) {
        if (ref.current && ref.current.contains(event.target)) {
          clickedInside = true;
          break;
        }
      }
      if (!clickedInside) {
        setShowDirectOptions(false);
        setShowEditOptions(false);
        setSelectedVideoId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const directVideos = apiData.filter(video => !video.needModify);
  const editVideos = apiData.filter(video => video.needModify);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-scroll h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold">
              Direct Output Without Editing Transcripts
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {directVideos.map((video) => (
                <div key={video.taskID} className="shadow-lg rounded-md p-4 flex">
                  <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                    <video src={video.mp4 || video.mp3} controls className="max-h-[150px] aspect-video" />
                  </div>
                  <div className="ml-6 font-light">
                    <div className="text-md font-semibold">{video.title}</div>
                    <p className="text-sm text-gray-600">By {video.target_language}</p>
                    <p>{video.status}</p>
                  </div>
                  {!video.processingDone && (
                    <div ref={threeDottedButtonRefs.current[video.taskID]} className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={() => handleDirectVideoOptions(video.taskID)}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {showDirectOptions && selectedVideoId === video.taskID && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Stop the Task
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Output Videos That Transcripts Needed To Be Edited
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {editVideos.map((video) => (
                <div key={video.taskID} className="shadow-lg rounded-md p-4 flex">
                  <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                    <video src={video.mp4 || video.mp3} controls className="max-h-[150px] aspect-video" />
                  </div>
                  <div className="ml-6 font-light">
                    <div className="text-md font-semibold">{video.title}</div>
                    <p className="text-sm text-gray-600">By {video.target_language}</p>
                    <p>{video.status}</p>
                  </div>
                  {!video.processingDone && (
                    <div ref={threeDottedButtonRefs.current[video.taskID]} className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={() => handleEditVideoOptions(video.taskID)}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {showEditOptions && selectedVideoId === video.taskID && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              
                            >
                              Edit Transcript
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Output Directly
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Stop the Task
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;
