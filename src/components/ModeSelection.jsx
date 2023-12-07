import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import "../components/tailwind-alerts.css";
import axios from "axios";
import { data } from "autoprefixer";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Discuss } from "react-loader-spinner";
import Tooltip from "@mui/material/Tooltip";
import "./bgStyles.css";

function ModeSelection() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState({
    name: "",
    length: "",
    location: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [posttargetlanguage, setposttargetlanguage] = useState("");

  const [postBGM, setpostBGM] = useState("true");
  const [postoutputmode, setpostoutputmode] = useState("transcript");
  const [posttitle, setposttitle] = useState("");
  const [postneedmodify, setpostneedmodify] = useState("false");
  const [postfileupload, setpostfileupload] = useState("");
  const [voiceLanguageSelect, setVoiceLanguageSelect] = useState("");

  useEffect(() => {
    axios
      .get("https://062b-140-119-19-91.ngrok-free.app/language/", {
        headers: {
          "ngrok-skip-browser-warning": 123,
        },
      })
      .then((response) => {
        setLanguageList(response.data);
        setposttargetlanguage(response.data[0].original_language);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const [languagelist, setLanguageList] = useState([]);

  const handleLanguageChange = (events) => {
    // setpostvoice(voices[events.target.value].usable_voices[0]);
    // setVoiceLanguageSelect(events.target.value);
    setposttargetlanguage(events.target.value);
    console.log("posttargetlanguage: ", events.target.value);
  };

  // ---------------------------------------------------------------------
  const handleSubmitClick = (events) => {
    setLoading(true);

    // Start the timeout immediately to navigate after 2.5 seconds
    const navigateTimeout = setTimeout(() => {
      setLoading(false);
      navigate("/service/processing");
    }, 3000);

    axios
      .postForm(
        `https://062b-140-119-19-91.ngrok-free.app/tasks/?target_language=${posttargetlanguage}&mode=${postoutputmode}&title=${posttitle}&needBgmusic=${postBGM}`,
        {
          file: document.querySelector("#video").files[0],
        },
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
          },
        }
      )
      .then(() => {
        // If the API call completes before the timeout, we clear the timeout
        clearTimeout(navigateTimeout);
        // Here, you might still want to navigate immediately or do something else
        setLoading(false);
        navigate("/service/processing");
      })
      .catch((error) => {
        // If there is an error, we clear the timeout as well
        clearTimeout(navigateTimeout);
        setLoading(false);
        alert(error);
      });
  };

  const handleBGM = (events) => {
    setpostBGM(events.target.value);
  };

  const handleOutputModeChange = (events) => {
    setpostoutputmode(events.target.value);
  };
  //   const a = {};
  // a['name'] = 'jack';

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setposttitle(videoFile.name.split(".")[0]);

      // Create a video element to get the duration
      const videoElement = document.createElement("video");
      videoElement.src = url;

      videoElement.addEventListener("loadedmetadata", () => {
        const durationInSeconds = videoElement.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        const length = `${minutes} minutes ${seconds} seconds`;

        setVideoMetadata({
          name: videoFile.name,
          length: length,
          location: url,
        });
      });
    }
  }, [videoFile]);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
    setposttitle(e.target.files[0].name.split(".")[0]);
  };

  const showAlert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "alert-confirm",
        cancelButton: "alert-cancel",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Sure to proceed?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, trascribe it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleSubmitClick();
          // swalWithBootstrapButtons.fire(
          //   "Transcribing in process!",
          //   "Your file is being processed.",
          //   "success"
          // );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <div className="w-full overflow-scroll h-screen">
      {loading && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
          <Discuss
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
        </div>
      )}
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
      <div className="flex items-center justify-center py-1.5">
        <span className=" text-2xl font-bold font-serif text-slate-500">
          - Settings -
        </span>
      </div>
      <div className="text-left text-lg font-semibold pl-11">
        <h1 className="mb-5"> Media</h1>

        <div className="flex">
          <div
            className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 
        focus:ring-opacity-50 "
          >
            <video
              src={videoMetadata.location}
              controls
              className="max-h-[150px] aspect-video"
            />
          </div>
          <div className="ml-6 font-light">
            <p>
              <strong className="font-bold">Name：</strong>
              <Tooltip title="Rename Title">
                <input
                  value={posttitle}
                  onChange={(e) => setposttitle(e.target.value)}
                  placeholder="Type video name here"
                />
              </Tooltip>
            </p>
            <p>
              <strong className="font-bold">Length：</strong>{" "}
              {videoMetadata.length}
            </p>
            <p>
              <strong className="font-bold">Location：</strong>{" "}
              {videoMetadata.location}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <label className=" mr-16 flex items-center p-2 cursor-pointer bg-white rounded-full border hover:shadow-md border-indigo-300 hover:bg-indigo-500 hover:text-white">
            <svg
              className="w-8 h-8 justify-center "
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <input
              id="video"
              type="file"
              className="hidden"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        <hr className="border-t-2 border-gray-300 w-auto my-4 mx-2 mr-12"/>
      </div>
      <div>
        <div className="flex gap-40 ml-32">
          <div className="block">
            <label
              htmlFor="small"
              className=" font-medium text-gray-900 dark:text-white text-base "
            >
              Output Language
            </label>
            <select
              onChange={handleLanguageChange}
              id="small"
              className="w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {languagelist.map((data, index) => (
                <option
                  key={data.original_language}
                  value={data.original_language}
                >
                  {data.mapped_language}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-40 ml-32 mt-16">
          <div className="block ">
            <label
              htmlFor="small"
              className=" mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Output Mode
            </label>
            <select
              onChange={handleOutputModeChange}
              id="small"
              className="  w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={"transcript"}>Transcript</option>
              <option value="audio">Audio.mp3</option>
              <option value="video">Video.mp4</option>
            </select>
          </div>
          <div className="block">
            <label
              htmlFor="default"
              className="mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Soundtrack & Instrumental
            </label>
            <select
              onChange={handleBGM}
              id="default"
              className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={"true"}>Keep Background Music</option>
              <option value="false">Exclude Background Music</option>
            </select>
          </div>
        </div>
        <div className="justify-end flex items-center ">
          <button
            type="button"
            className=" text-indigo-400 w-auto px-4 py-2 mr-16 rounded-full shadow-lg tracking-wide uppercase border border-indigo-400 cursor-pointer hover:bg-indigo-400 hover:text-white font-semibold  focus:ring-3 focus:outline-none focus:ring-indigo-400 ring-1 mt-20"
            onClick={showAlert}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeSelection;