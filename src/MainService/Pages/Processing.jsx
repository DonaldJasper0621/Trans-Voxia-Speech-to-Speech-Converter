import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../Sidebar/Sidebar";

const Processing = () => {
  const videos = {
    direct: [
      {
        id: 1,
        title: "Video 1",
        cover: "https://example.com/cover1.jpg",
        author: "Author 1",
        length: "2:30",
        processingDone: true,
        location: "https://example.com/video1.mp4"
      },
      {
        id: 2,
        title: "Video 2",
        cover: "https://example.com/cover2.jpg",
        author: "Author 2",
        length: "3:45",
        processingDone: false,
        location: "https://example.com/video2.mp4"
      },
      // Add more direct videos here
    ],
    edit: [
      {
        id: 3,
        title: "Video 3",
        cover: "https://example.com/cover3.jpg",
        author: "Author 3",
        length: "1:50",
        processingDone: true,
        location: "https://example.com/video3.mp4"
      },
      {
        id: 4,
        title: "Video 4",
        cover: "https://example.com/cover4.jpg",
        author: "Author 4",
        length: "4:15",
        processingDone: false,
        location: "https://example.com/video4.mp4"
      },
      // Add more edit videos here
    ]
  };

  const [showDirectOptions, setShowDirectOptions] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const threeDottedButtonRef = useRef(null);

  const handleDirectVideoOptions = () => {
    setShowDirectOptions(!showDirectOptions);
  };

  const handleEditVideoOptions = () => {
    setShowEditOptions(!showEditOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (threeDottedButtonRef.current && !threeDottedButtonRef.current.contains(event.target)) {
        setShowDirectOptions(false);
        setShowEditOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-scroll h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="justify-items-start">Output directly</div>
        </div>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold">
              Direct Output Without Editing Transcripts
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {videos.direct.map((video) => (
                <div key={video.id} className="shadow-lg rounded-md p-4 flex">
                  <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                    <video src={video.location} controls className="max-h-[150px] aspect-video" />
                  </div>
                  <div className="ml-6 font-light">
                    <h2 className="text-md font-semibold">{video.title}</h2>
                    <p className="text-sm text-gray-600">By {video.author}</p>
                    <p>{video.length}</p>
                    <p className="text-sm text-gray-600">
                      {video.processingDone ? 'Processing Done' : 'Processing...'}
                    </p>
                  </div>
                  {!video.processingDone && (
                    <div ref={threeDottedButtonRef} className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={handleDirectVideoOptions}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {showDirectOptions && (
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
              {videos.edit.map((video) => (
                <div key={video.id} className="shadow-lg rounded-md p-4 flex">
                  <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                    <video src={video.location} controls className="max-h-[150px] aspect-video" />
                  </div>
                  <div className="ml-6 font-light">
                    <h2 className="text-md font-semibold">{video.title}</h2>
                    <p className="text-sm text-gray-600">By {video.author}</p>
                    <p>{video.length}</p>
                    <p className="text-sm text-gray-600">
                      {video.processingDone ? 'Processing Done' : 'Processing...'}
                    </p>
                  </div>
                  {!video.processingDone && (
                    <div ref={threeDottedButtonRef} className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={handleEditVideoOptions}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      {showEditOptions && (
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
