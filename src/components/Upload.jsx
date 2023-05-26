import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { MdOutlineVideoLibrary, MdOutlineDescription } from "react-icons/md";
import { FaRegFileAudio } from "react-icons/fa";
import { useEffect, useState } from "react";
import Processing from "../MainService/Pages/Processing";
import Tabs from "./Tabs";
import Medialibrary from "../MainService/Pages/MediaLibrary";
import TableRow from "../MainService/Pages/TableRow";

const VideoDashboard = () => {
  const mockVideos = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video3.mp4",
    "video3.mp4",
    "video3.mp4",
    "video3.mp4",
  ]; // placeholder for video file names

  const mockAudios = [
    "audio1.mp3",
    "audio2.mp3",
    "audio3.mp3",
    "audio4.mp3",
    "audio5.mp3",
    "audio6.mp3",
    "audio7.mp3",
  ]; // placeholder for audio file names

  const tabs = [
    {
      id: 1,
      icon: <MdOutlineVideoLibrary className="mr-2" size={25} />,
      label: (
        <span className=" font-semibold text-lg text-slate-500 ">
          MP4. File
        </span>
      ),
      content: (
        <div className="flex flex-wrap justify-center my-8 mt-9">
          {mockVideos.map((video, index) => (
            <div
              className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
              key={index}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{video}</div>
                <video controls className="w-full h-48">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 2,
      icon: <FaRegFileAudio className="mr-2" size={25} />,
      label: (
        <span className=" font-semibold text-lg text-slate-500 ">
          MP3. File
        </span>
      ),
      content: <Medialibrary />,
    },
    {
      id: 3,
      icon: <MdOutlineDescription className="mr-2" size={25} />,
      label: (
        <span className=" font-semibold text-lg text-slate-500 ">
          TypeScript File
        </span>
      ),
      content: <TableRow />,
    },
  ];

  //   const [file, setFile] = useState();

  //   const handleFileChange = (e) => {
  //     console.log("e:", e);
  //     if (e.target.files) {
  //       setFile(e.target.files[0]);
  //       console.log("files", e.target.files);
  //     }
  //   };

  return (
    <div className="container overflow-scroll h-screen">
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
      <div className=" flex items-center w- py-8  ml-9">
        <AiOutlineFolderOpen className="mr-2" size={30} />
        <span className=" text-2xl font-bold text-slate-500">Files</span>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default VideoDashboard;
