import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Sidebar from "../Sidebar/Sidebar";

const processing = ({ videos }) => {

  const processedVideos = [
    { id: 1, title: "Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Video 2", url: "https://example.com/video2" },
    { id: 3, title: "Video 3", url: "https://example.com/video3" },
  ];

    return(
  <div className="flex"> 
  <Sidebar/>
  <div className="w-full overflow-scroll h-screen">
      <div className=" top-0 left-0 right-0 z-50 w-full py-4 text-sm leading-5 text-center overflow-hidden whitespace-nowrap text-white bg-gradient-to-r from-green-500 to-indigo-800">
        <span>
          You have <strong>15</strong> minutes &amp; <strong>10</strong> free
          downloads remaining. Upgrade for more minutes, unlimited access to
          premium voices &amp; downloads.
        </span>
        <a
          target="_blank"
          href="../About"
          className="ant-btn upgrade-button ant-btn-sm ant-btn-background-ghost"
        >
          <span>Upgrade</span>
        </a>
      </div>
      <div className="container mx-auto px-4 py-8">
      <div className="justify-items-start">
        Output directly
      </div>
    </div>
    <div className="container mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Direct Output Without Editing Transcripts</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {videos.direct.map((video) => 
                        <VideoCard key={video.id} video={video} />
                    )}
                </div>
            </div>

            <div>
                <h1 className="text-xl font-bold">Output Videos That Transcripts Needed To Be Edited</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {videos.edit.map((video) => 
                        <VideoCard key={video.id} video={video} />
                    )}
                </div>
            </div>
        </div>
      
    </div>
    </div>
    )
}

const VideoCard = ({ video }) => {
  return (
      <div className="shadow-lg rounded-md p-4">
          <img src={video.cover} alt={video.title} className="rounded-lg mb-4" />
          <div className="flex justify-between items-center mb-2">
              <div>
                  <h2 className="text-md font-semibold">{video.title}</h2>
                  <p className="text-sm text-gray-600">By {video.author}</p>
              </div>
              <div className="relative inline-block text-left">
                  <button type="button" className="rounded-full p-2 hover:bg-gray-200">
                      <i className="fas fa-ellipsis-v"></i> 
                  </button>
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit Transcript</button>
                      </div>
                  </div>
              </div>
          </div>
          <p>{video.length}</p>
          <p className="text-sm text-gray-600">{video.processingDone ? 'Processing Done' : 'Processing...'}</p>
      </div>
  )
}
export default processing;

