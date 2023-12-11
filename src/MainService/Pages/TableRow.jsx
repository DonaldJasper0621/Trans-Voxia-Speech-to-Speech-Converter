import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import {
  MdOutlineHeadphones,
  MdOutlineMovieFilter,
  MdOutlineVideoLibrary,
  MdOutlineDescription,
} from "react-icons/md";
import { FaRegFileAudio } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import axios from "axios";

function TableRow({ data }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMouseEnter = () => {
    setIsButtonDisabled(true);
  };

  const handleMouseLeave = () => {
    setIsButtonDisabled(false);
  };

  const downloadTranscript = () => {
    // Convert the transcript data into a string format
    const transcriptText = data.transcript.map((t) => t.join("\t")).join("\n");

    // Create a Blob from the transcript string
    const blob = new Blob([transcriptText], { type: "text/plain" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute to the filename you wish to use
    link.download = "transcript.txt";

    // Create a URL for the blob and set it as the href of the link
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };

  const getFileIcon = (mode) => {
    if (mode === "video") {
      return <MdOutlineVideoLibrary className="mr-1" size={32} />;
    } else if (mode === "audio") {
      return <FaRegFileAudio className="max-h-[120px] max-w-[210px] overflow-hidden" strokeWidth="1px" color="#d1d5db" size={250} />;
    } else if (mode === "transcript") {
      return <AiOutlineFolderOpen className="max-h-[120px] max-w-[210px] overflow-hidden" strokeWidth="1px" color="#d1d5db" size={250} />;
    } else {
      return null;
    }
  };

  function downloadFile(url, fileName) {
    console.log("should download");
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.target = "_blank";

    // Append the link to the DOM (this is required for the download to work in some browsers)
    document.body.appendChild(downloadLink);

    // Click the link to start the download
    downloadLink.click();

    // Remove the link (it's not needed anymore)
    document.body.removeChild(downloadLink);
  }

  const handleDownloadLink = (event, mode) => {
    event.preventDefault();

    if (mode === "video") {
      downloadFile(data.mp4, data.title);
    } else if (mode === "audio") {
      downloadFile(data.mp3, data.title);
    } else if (mode === "transcript") {
      downloadFile(data.transcript, data.title);
    }
  };

  const getRequestTime = (requestTime) => {
    const date = new Date(requestTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 since months are zero-based
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const getLanguage = (lan) => {
    if (lan === "ZH") {
      return "Chinese";
    } else if (lan === "FR") {
      return "Franch";
    } else if (lan === "JA") {
      return "Japanese";
    } else if (lan === "EN") {
      return "English";
    } else if (lan === "RU") {
      return "Russian";
    } else if (lan === "ES") {
      return "Spanish";
    } else if (lan === "DE") {
      return "German";
    } else if (lan === "ID") {
      return "Indonesian";
    } else if (lan === "KO") {
      return "Korean";
    } else if (lan === "IT") {
      return "Italian";
    } else if (lan === "PL") {
      return "Polish";
    } else if (lan === "PT") {
      return "Portuguese";
    } else if (lan === "RO") {
      return "Romanian";
    } else if (lan === "SV") {
      return "Swedish";
    } else if (lan === "TR") {
      return "Turkish";
    }
    else {
      return lan;
    }
  };

  return (
    <div className="ml-6 mr-6 border-b border-gray-200 flex py-5 pl-7 w-auto">
      {/*<div className="flex py-3 mr-6 items-center">
        <input type="checkbox" className="mx-auto h-4 w-4" />
  </div>*/}
      <div className="flex mr-auto">
        <div className="flex items-center">
          {/* Render the appropriate icon based on the data type */}
          {data.mode === "audio" && getFileIcon(data.mode)}
          {data.mode === "transcript" && getFileIcon(data.mode)}
          {data.mode === "video" && (
            <div className="rounded-lg ring-2 ring-slate-300 focus:ring-opacity-50 hover:ring-slate-600">
            <video
              src={data.mp4}
              controls
              className="rounded-lg max-h-[120px] max-w-[210px] aspect-video"
            />
          </div>
          )}
        </div>
        <div className="text-left ml-6 flex-col overflow-hidden">
          <h3 className="font-bold font-sans text-xl mb-1">{data.title}</h3>
          <p className="text-sm font-serif italic text-zinc-400">By：{getLanguage(data.target_language)}</p>
          <p className="text-xs text-zinc-400"> {data.voice_selection}</p>
          <p className="text-sm font-serif italic mt-10 text-zinc-400">
            Created：{getRequestTime(data.request_time)} 
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center mr-2">
        <div className="mt-7 flex">
          {/*<p className="text-sm font-serif italic text-zinc-400">
            created :{getRequestTime(data.request_time)} 
          </p>*/}
        </div>
        <div className="flex justify-end items-center min-w-[220px]">
          {" "}
          {/* Use flexbox with justify-between */}
          {/* <NavLink
          to="/download"
          target="_blank"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center"
        >
          <MdOutlineDescription className="mr-1" />
          Download
        </NavLink> */}
          <NavLink
            to={"/service/transcript"}
            className="btn bg-slate-200 shadow-md rounded-full py-2 px-2 flex items-center mr-4 hover:bg-emerald-100"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default navigation
              downloadTranscript(); // Call the function to download transcript
            }}
          >
            <MdOutlineDescription
              className="fill-emerald-500 justify-center hover:fill-emerald-600"
              size={21}
            />
            <span className="text-emerald-600"> Transcript</span>
          </NavLink>
          {data.mode === "video" && (
            <>
              <NavLink
                to={"/service/audio"}
                target="_blank"
                className={`btn bg-slate-200 shadow-md rounded-full px-2 py-2 mr-4 flex items-center ${
                  isButtonDisabled
                    ? "cursor-not-allowed"
                    : "hover:cursor-not-allowed"
                }`}
                onClick={(e) => {
                  if (isButtonDisabled) {
                    e.preventDefault();
                  } else {
                    // Handle your onClick event here
                  }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <MdOutlineHeadphones className="fill-sky-600" size={21} />
                <span className="text-sky-600"> Audio</span>
              </NavLink>

              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  handleDownloadLink(e, "video");
                }}
                to={"/service/video"}
                target="_blank"
                className="btn bg-slate-200 shadow-md rounded-full px-2 py-2 flex items-center hover:bg-violet-100"
              >
                <MdOutlineMovieFilter
                  className=" fill-violet-600 justify-items-center"
                  size={21}
                />
                <span className=" text-violet-600"> Video</span>
              </NavLink>
            </>
          )}
          {data.mode === "audio" && (
            <>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  handleDownloadLink(e, "audio");
                }}
                to={"/service/audio"}
                target="_blank"
                className=" btn  bg-slate-200 shadow-md rounded-full px-2 py-2 mr-4 flex items-center hover:bg-sky-100"
              >
                <MdOutlineHeadphones
                  className=" fill-sky-600 justify-center hover:fill-sky-800"
                  size={21}
                />
                <span className=" text-sky-600 "> Audio</span>
              </NavLink>
              <NavLink
                to={"/service/video"}
                target="_blank"
                className=" bg-transparent shadow-none px-2 py-2 rounded-full flex items-center pointer-events-none"
              >
                <MdOutlineMovieFilter className=" fill-transparent" size={21} />
              </NavLink>
            </>
          )}
          {data.mode === "transcript" && (
            <>
              <NavLink
                to="/audio"
                target="_blank"
                className="bg-transparent shadow-none px-2 py-2 rounded-full mr-4 flex items-center pointer-events-none"
              >
                <MdOutlineHeadphones className=" fill-transparent" size={21} />
              </NavLink>
              <NavLink
                to={"/service/video"}
                target="_blank"
                className=" bg-transparent shadow-none px-2 py-2 rounded-full flex items-center pointer-events-none"
              >
                <MdOutlineMovieFilter className=" fill-transparent" size={21} />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Example usage of TableRow componentttt
// Example usage of TableRow component
const PAGE_ITEM = 30;
function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://transvoxia.ngrok.io/tasks?n=${PAGE_ITEM}&page=${page}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
          },
        }
      )
      .then((response) => {
        const completedTasks = response.data.results.filter(
          (task) => task.status === "任務完成"
        );
        setTasks((prevTasks) => [...prevTasks, ...completedTasks]);
      })
      .catch((error) => {
        alert(error);
      });
  }, [page]);

  const fetchMoreData = () => {
    axios
      .get(
        `https://transvoxia.ngrok.io/tasks?n=${PAGE_ITEM}&page=${page}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
          },
        }
      )
      .then((response) => {
        const completedTasks = response.data.results.filter(
          (task) => task.status === "任務完成"
        );
        setTasks((prevTasks) => [...prevTasks, ...completedTasks]);
        if (completedTasks.length < PAGE_ITEM) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div id="test" className="w-full">
      <InfiniteScroll
        dataLength={PAGE_ITEM}
        next={fetchMoreData} // Updated here
        hasMore={hasMore} // You can update this based on your API response
        loader={<h4>Loading...</h4>}
      >
        {tasks.map((data, index) => (
          <TableRow key={index} data={data} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;