import React from 'react';
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
        processingDone: true
      },
      {
        id: 2,
        title: "Video 2",
        cover: "https://example.com/cover2.jpg",
        author: "Author 2",
        length: "3:45",
        processingDone: false
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
        processingDone: true
      },
      {
        id: 4,
        title: "Video 4",
        cover: "https://example.com/cover4.jpg",
        author: "Author 4",
        length: "4:15",
        processingDone: false
      },
      // Add more edit videos here
    ]
  };

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
            <div className="grid grid-cols-3 gap-4 mt-4">
              {videos.direct.map((video) => (
                <div key={video.id} className="shadow-lg rounded-md p-4">
                  <img
                    src={video.cover}
                    alt={video.title}
                    className="rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-md font-semibold">{video.title}</h2>
                      <p className="text-sm text-gray-600">By {video.author}</p>
                    </div>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{video.length}</p>
                  <p className="text-sm text-gray-600">
                    {video.processingDone ? 'Processing Done' : 'Processing...'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Output Videos That Transcripts Needed To Be Edited
            </h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {videos.edit.map((video) => (
                <div key={video.id} className="shadow-lg rounded-md p-4">
                  <img
                    src={video.cover}
                    alt={video.title}
                    className="rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-md font-semibold">{video.title}</h2>
                      <p className="text-sm text-gray-600">By {video.author}</p>
                    </div>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="rounded-full p-2 hover:bg-gray-200"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{video.length}</p>
                  <p className="text-sm text-gray-600">
                    {video.processingDone ? 'Processing Done' : 'Processing...'}
                  </p>
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
