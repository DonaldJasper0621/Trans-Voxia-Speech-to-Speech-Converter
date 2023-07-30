import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { MdOutlineVideoLibrary, MdOutlineDescription } from "react-icons/md";
import { FaRegFileAudio } from "react-icons/fa";
import { useEffect, useState } from "react";
import Processing from "../MainService/Pages/Processing";
import AnalyticsPage from "../MainService/Pages/AnalyticsPage";
import Tabs from "./Tabs";
import Medialibrary from "../MainService/Pages/MediaLibrary";
import TableRow from "../MainService/Pages/TableRow";
import { Fade } from "@mui/material";
import { Analytics } from "@mui/icons-material";
import axios from "axios";

const VideoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [audioTasks, setAudioTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_ITEM = 100;

  const fetchVideoTasks = () => {
    axios
      .get(`http://140.119.19.16:8000/tasks/?n=${PAGE_ITEM}&page=${page}`)
      .then((response) => {
        const completedVideoTasks = response.data.results.filter(task => 
          task.status === "任務完成" && task.mode === 'video'
        );
        setTasks((prevTasks) => [...prevTasks, ...completedVideoTasks]);
        if (completedVideoTasks.length < PAGE_ITEM) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const fetchAudioTasks = () => {
    axios
      .get(`http://140.119.19.16:8000/tasks/?n=${PAGE_ITEM}&page=${page}`)
      .then((response) => {
        const completedAudioTasks = response.data.results.filter(task => 
          task.status === "任務完成" && task.mode === 'audio'
        );
        setAudioTasks((prevTasks) => [...prevTasks, ...completedAudioTasks]);
        if (completedAudioTasks.length < PAGE_ITEM) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchVideoTasks();
  }, [page]);

  useEffect(() => {
    fetchAudioTasks();
  }, [page]);

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
      id: 3,
      icon: <MdOutlineDescription className="mr-2" size={25} />,
      label: (
        <span className=" font-semibold text-lg text-slate-500 ">
          File Overview
        </span>
      ),
      content: <TableRow />,
    },
    {
      id: 2,
      icon: <FaRegFileAudio className="mr-2" size={25} />,
      label: (
        <span className=" font-semibold text-lg text-slate-500 ">
          MP3. File
        </span>
      ),
      content: (
        <div className="flex flex-wrap justify-center my-8 mt-9">
          {audioTasks.map((task, index) => (
            <div
              className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
              key={index}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{task.title}</div>{" "}
                {/* assuming 'file_name' is the property for the audio name */}
                <audio controls className="w-full h-48">
                  <source src={task.mp3} type="audio/mpeg" />{" "}
                  {/* assuming 'file_url' is the property for the audio URL */}
                  Your browser does not support the audio tag.
                </audio>
              </div>
            </div>
          ))}
        </div>
      ),
    },
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
          {tasks.map((task, index) => (
            <div
              className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
              key={index}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{task.title}</div>{" "}
                {/* assuming 'file_name' is the property for the video name */}
                <video controls className="w-full h-48">
                  <source src={task.mp4} type="video/mp4" />{" "}
                  {/* assuming 'file_url' is the property for the video URL */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>
      ),
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
    <Fade in={open} timeout={500}>
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

        <div className=" flex items-center w- py-8  ml-9">
          <AiOutlineFolderOpen className="mr-2" size={30} />
          <span className=" text-2xl font-bold text-slate-500">Files</span>
        </div>

        <Tabs tabs={tabs} />
      </div>
    </Fade>
  );
};

export default VideoDashboard;
