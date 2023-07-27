import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { MdOutlineVideoLibrary, MdOutlineDescription } from "react-icons/md";
import { FaRegFileAudio } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import axios from "axios";

function TableRow({ data }) {
  const getFileIcon = (mode) => {
    if (mode === "video") {
      return <MdOutlineVideoLibrary className="mr-1 h-6 w-6" />;
    } else if (mode === "audio") {
      return <FaRegFileAudio className="mr-1 h-6 w-6" />;
    } else if (mode === "transcript") {
      return <AiOutlineFolderOpen className="mr-1 h-6 w-6" />;
    } else {
      return null;
    }
  };

  function downloadmp4File(url, fileName) {
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

  const handleDownloadLink = (event) => {
    downloadmp4File(data.mp4, data.title);
  };

  const getRequestTime = (requestTime) => {
    const date = new Date(requestTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 since months are zero-based
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="text-center border-b border-gray-200 flex py-8 pl-7 w-full">
      <div className="flex py-3">
        <input type="checkbox" className="mx-auto h-4 w-4" />
      </div>
      <div className="flex mr-auto">
        <div className="w-full flex items-center">
          {/* Render the appropriate icon based on the data type */}
          {getFileIcon(data.mode)}
          <div className="text-sm mt-2 ml-4 flex overflow-hidden ">
            <p>{data.title}</p>
            <p>{data.targetlanguage}</p>
            <p>{data.voice_selection}</p>
            <p>{getRequestTime(data.request_time)}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end mr-6">
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
          target="_blank"
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center mr-2"
        >
          <MdOutlineVideoLibrary />
          Transcript
        </NavLink>
        {data.mode === "video" && (
          <>
            <NavLink
              to={"/service/audio"}
              target="_blank"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center"
            >
              <FaRegFileAudio className="mr-1" />
              Audio
            </NavLink>
            <NavLink
              onClick={handleDownloadLink}
              to={"/service/video"}
              target="_blank"
              className="bg-purple-500 text-white px-4 py-2 rounded mr-2 flex items-center"
            >
              <IoMdAddCircleOutline className="mr-1" />
              Video
            </NavLink>
          </>
        )}
        {data.mode === "audio" && (
          <>
            <NavLink
              to={"/service/audio"}
              target="_blank"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center"
            >
              <FaRegFileAudio className="mr-1" />
              Audio
            </NavLink>
            <NavLink
              to={"/service/video"}
              target="_blank"
              className="bg-purple-300 text-white px-4 py-2 rounded mr-2 flex items-center pointer-events-none"
            >
              <IoMdAddCircleOutline className="mr-1" /> Video
            </NavLink>
          </>
        )}
        {data.mode === "transcript" && (
          <>
            <NavLink
              to="/audio"
              target="_blank"
              className="bg-red-200 text-white px-4 py-2 rounded mr-2 flex items-center pointer-events-none"
            >
              <FaRegFileAudio className="mr-1" />
              Audio
            </NavLink>
            <NavLink
              to={"/service/video"}
              target="_blank"
              className="bg-purple-300 text-white px-4 py-2 rounded mr-2 flex items-center pointer-events-none"
            >
              <IoMdAddCircleOutline className="mr-1" />
              Video
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

// Example usage of TableRow component
// Example usage of TableRow component
const PAGE_ITEM = 100;
function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get(`http://140.119.19.16:8001/tasks/?n=${PAGE_ITEM}&page=${page}`)
      .then((response) => {
        console.log("1");
        setTasks((prevTasks) => [...prevTasks, ...response.data]);
      })
      .catch((error) => {
        alert(error);
      });
  }, [page]);

  const fetchMoreData = () => {
    console.log("2");
    axios
      .get(`http://140.119.19.16:8001/tasks/?n=${PAGE_ITEM}&page=${page}`)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, ...response.data]);
        if (response.data.length < PAGE_ITEM) {
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
