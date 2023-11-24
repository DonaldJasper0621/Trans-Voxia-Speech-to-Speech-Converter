import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import {
  MdOutlineMap,
  MdOutlineMovieFilter,
  MdOutlineHeadphones,
  MdOutlineDescription,
} from "react-icons/md";
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
import { bgcolor } from "@mui/system";
import "./bgStyles.css";

const VideoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [audioTasks, setAudioTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_ITEM = 50;

  const fetchVideoTasks = () => {
    axios
      .get(
        `https://b45e-140-119-19-91.ngrok-free.app/tasks/?n=${PAGE_ITEM}&page=${page}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
          },
        }
      )
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, ...tasks]);
        if (response.data.next === null) {
          setHasMore(false);
        } else {
          console.log(1);
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log("page: ", page, "hasMore: ", hasMore);
    fetchVideoTasks();
  }, [page, hasMore]);

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
      icon: <MdOutlineMap className="mr-2 fill-slate-600" size={24} />,
      label: <span className="font-semibold text-lg text-slate-500">All</span>,
      content: <TableRow />,
    },
    // {
    //   id: 2,
    //   icon: <MdOutlineHeadphones className="mr-2 fill-slate-600" size={24} />,
    //   label: (
    //     <span className=" font-semibold text-lg text-slate-500 ">MP3</span>
    //   ),
    //   content: (
    //     <div className="flex flex-wrap justify-center my-8 mt-9">
    //       {tasks.filter(((task) => task.status === "任務完成" && task.mode === "audio")).map((task, index) => (
    //         <div
    //           className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
    //           key={index}
    //         >
    //           <div className="px-6 py-4">
    //             <div className="font-bold text-xl mb-2">{task.title}</div>{" "}
    //             {/* assuming 'file_name' is the property for the audio name */}
    //             <audio controls className="w-full h-48">
    //               <source src={task.mp3} type="audio/mpeg" />{" "}
    //               {/* assuming 'file_url' is the property for the audio URL */}
    //               Your browser does not support the audio tag.
    //             </audio>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    // {
    //   id: 1,
    //   icon: <MdOutlineMovieFilter className="mr-2 fill-slate-600" size={24} />,
    //   label: (
    //     <span className=" font-semibold text-lg text-slate-500 ">MP4</span>
    //   ),
    //   content: (
    //     <div className="flex flex-wrap justify-center my-8 mt-9">
    //       {tasks.filter(((task) => task.status === "任務完成" && task.mode === "video")).map((task, index) => (
    //         <div
    //           className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
    //           key={index}
    //         >
    //           <div className="px-6 py-4">
    //             <div className="font-bold text-xl mb-2">{task.title}</div>{" "}
    //             {/* assuming 'file_name' is the property for the video name */}
    //             <video controls className="w-full h-48">
    //               <source src={task.mp4} type="video/mp4" />{" "}
    //               {/* assuming 'file_url' is the property for the video URL */}
    //               Your browser does not support the video tag.
    //             </video>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
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
        <div className="flex-auto top-0 left-0 right-0 z-50 w-full h-12 py-3 text-center text-sm leading-5 whitespace-nowrap text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 background-animate">
          <span>
            You have <strong>15</strong> minutes &amp; <strong>10</strong> free
            downloads remaining. Upgrade for more minutes, unlimited access to
            premium voices &amp; downloads.
          </span>
          <a
            target="_blank"
            href="../About"
            className="ant-btn upgrade-button ant-btn-sm"
          >
            <span>
              <button className="w-20 h-auto border-l border-r border-b border-t border-solid border-white bg-transparent hover:bg-white ml-2 text-white hover:text-current ">
                {" "}
                Upgrade
              </button>
            </span>
          </a>
        </div>

        <div className=" flex items-center w- py-3  ml-9"></div>

        <Tabs tabs={tabs} />
      </div>
    </Fade>
  );
};

export default VideoDashboard;
