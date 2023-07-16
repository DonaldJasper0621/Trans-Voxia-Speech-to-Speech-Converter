import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import "../components/tailwind-alerts.css";
import axios from "axios";
import { data } from "autoprefixer";
import qs from "qs";

function ModeSelection() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState({
    name: "",
    length: "",
    location: "",
  });

  useEffect(() => {
    axios
      .get("http://140.119.19.16:8001/language/")
      .then((response) => {
        setLanguageList(response.data);
        setposttargetlanguage(response.data[0].original_language);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const [languagelist, setLanguageList] = useState([]);

  useEffect(() => {
    axios
      .get("http://140.119.19.16:8001/voices/")
      .then((response) => {
        setVoices(response.data);
        setpostvoice(Object.values(response.data)[0].usable_voices[0]);
        setVoiceLanguageSelect(Object.keys(response.data)[0]);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const [voices, setVoices] = useState({});
  const [voicelanguageselect, setVoiceLanguageSelect] = useState("");

  const handleLanguageChange = (events) => {
    setpostvoice(voices[events.target.value].usable_voices[0]);
    setVoiceLanguageSelect(events.target.value);
    setposttargetlanguage(events.target.value);
    console.log(events);
  };

  const handleVoiceLanguageChange = (events) => {
    setpostvoice(events.target.value);
  };
  // ---------------------------------------------------------------------
  const handleSubmitClick = (events) => {
    axios.postForm(
      `http://140.119.19.16:8001/tasks/?target_language=${posttargetlanguage}&voice_selection=${postvoice}&mode=${postoutputmode}&title=${posttitle}&needModify=${postneedmodify}`,
      {
        file: document.querySelector("#video").files[0],
      },
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("key")}`,
          "X-CSRFToken":
            "iDoESx51anPaFPx6CyNoHCcXxsCpvJI51dJWaMJsQ9VlxrilTaGZVQShBrrypVE9",
        },
      }
    );
  };

  const [posttargetlanguage, setposttargetlanguage] = useState("");
  const [postvoice, setpostvoice] = useState("");
  const [postoutputmode, setpostoutputmode] = useState("transcript");
  const [posttitle, setposttitle] = useState("");
  const [postneedmodify, setpostneedmodify] = useState("false");
  const [postfileupload, setpostfileupload] = useState("");

  const handleNeedModifyChange = (events) => {
    setpostneedmodify(events.target.value);
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
      setVideoMetadata({
        name: videoFile.name,
        length: videoFile.duration,
        location: url,
      });
    }
  }, [videoFile]);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
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
          swalWithBootstrapButtons.fire(
            "Transcribing in process!",
            "Your file is being processed.",
            "success"
          );
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
      <div className=" flex items-center justify-center py-3 bg-slate-100">
        <span className=" text-2xl font-bold text-slate-500">
          Video Settings
        </span>
      </div>
      <div className="text-left text-lg font-semibold  pl-11">
        <h1 className="mb-5 mt-4"> Media</h1>

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
              <strong>Name:</strong> {videoMetadata.name}
            </p>
            <p>
              <strong>Length:</strong> {videoMetadata.length}
            </p>
            <p>
              <strong>Location:</strong> {videoMetadata.location}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <label className="w-48 mr-16 flex items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-300 cursor-pointer hover:bg-blue-500 hover:text-white gap-4">
            <svg
              className="w-8 h-8 "
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              id="video"
              type="file"
              className="hidden"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        <hr className="border-t-2 border-gray-300 w-[1130px] my-4 mx-2" />
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
              className="  w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="block">
            <label
              htmlFor="default"
              className="mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Output Voices
            </label>
            <select
              onChange={handleVoiceLanguageChange}
              id="default"
              className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {voices[voicelanguageselect] &&
                voices[voicelanguageselect].usable_voices.map((value) => (
                  <option key={value} value={value}>
                    {" "}
                    {value}{" "}
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
              Processing Mode
            </label>
            <select
              onChange={handleNeedModifyChange}
              id="default"
              className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={"false"}>
                Direct output without editing the transcript
              </option>
              <option value={true}>Output with editing the transcript</option>
            </select>
          </div>
        </div>
        <div className="justify-end flex items-center ">
          <button
            type="button"
            className="text-gray-900 w-48 mr-16  text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-300 cursor-pointer hover:bg-blue-500 hover:text-white font-semibold  focus:ring-3 focus:outline-none focus:ring-blue-300 ring-2 mt-20"
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
