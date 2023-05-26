import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { MdOutlineVideoLibrary, MdOutlineDescription } from "react-icons/md";
import { FaRegFileAudio } from "react-icons/fa";

function TableRow({ videoData }) {
  const getFileIcon = (type) => {
    if (type === "video") {
      return <MdOutlineVideoLibrary className="mr-1" />;
    } else if (type === "audio") {
      return <FaRegFileAudio className="mr-1" />;
    } else if (type === "text") {
      return <AiOutlineFolderOpen className="mr-1" />;
    } else {
      return null;
    }
  };

  return (
    <div className="text-center border-b border-gray-200 flex py-8 pl-7 w-[100vh]">
      <td className="flex py-3">
        <input type="checkbox" className="mx-auto" />
      </td>
      <td className="flex mr-auto">
        <div className="w-full flex items-center">
          {/* Render the appropriate icon based on the data type */}
          {getFileIcon(videoData.type)}
          <div className="text-sm mt-2 ml-4 flex overflow-hidden">
            <p>{videoData.title}</p>
            <p>{videoData.language}</p>
            <p>{videoData.speaker}</p>
            <p>{videoData.creationDate}</p>
          </div>
        </div>
      </td>
      <td className="flex items-end justify-end">
        {" "}
        {/* Use flexbox with justify-between */}
        <NavLink
          to="/download"
          target="_blank"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center"
        >
          <MdOutlineDescription className="mr-1" />
          Download
        </NavLink>
        <NavLink
          to="/edit"
          target="_blank"
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 flex items-center"
        >
          <IoMdAddCircleOutline className="mr-1" />
          Edit
        </NavLink>
        {videoData.type === "video" && (
          <>
            <NavLink
              to="/audio"
              target="_blank"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center"
            >
              <FaRegFileAudio className="mr-1" />
              Audio
            </NavLink>
            <NavLink
              to="/transcript"
              target="_blank"
              className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
            >
              <MdOutlineVideoLibrary className="mr-1" />
              Transcript
            </NavLink>
          </>
        )}
        {videoData.type === "audio" && (
          <NavLink
            to="/transcript"
            target="_blank"
            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
          >
            <MdOutlineVideoLibrary className="mr-1" />
            Transcript
          </NavLink>
        )}
      </td>
    </div>
  );
}

// Example usage of TableRow component
// Example usage of TableRow component
const sampleData = [
  {
    src: "https://example.com/video1.mp4",
    title: "Video 1",
    currentTime: "0:35",
    speaker: "John Doe",
    creationDate: "2023-05-24",
    type: "video",
    language: "English",
  },
  {
    src: "https://example.com/audio1.mp3",
    title: " Anuel aa GQ test",
    currentTime: "2:15",
    speaker: "Jane Smith",
    creationDate: "2023-05-25",
    type: "audio",
    language: "Spanish",
  },
  {
    src: "https://example.com/text1.txt",
    title: "Mala Santa Becky G ",
    currentTime: "N/A",
    speaker: "Keldon Johnson",
    creationDate: "2023-05-26",
    type: "text",
    language: "French",
  },
  // Add more data entries here with different types and languages
  {
    src: "https://example.com/video2.mp4",
    title: "Video 2",
    currentTime: "1:20",
    speaker: "Alice Johnson",
    creationDate: "2023-05-27",
    type: "video",
    language: "German",
  },
  {
    src: "https://example.com/audio2.mp3",
    title: "Audio 2",
    currentTime: "3:45",
    speaker: "Bob Wilson",
    creationDate: "2023-05-28",
    type: "audio",
    language: "Italian",
  },
  {
    src: "https://example.com/text2.txt",
    title: "Text 2",
    currentTime: "N/A",
    speaker: "N/A",
    creationDate: "2023-05-29",
    type: "text",
    language: "Japanese",
  },
  {
    src: "https://example.com/text2.txt",
    title: "Text 2",
    currentTime: "N/A",
    speaker: "N/A",
    creationDate: "2023-05-29",
    type: "text",
    language: "Japanese",
  },
  {
    src: "https://example.com/text2.txt",
    title: "Text 2",
    currentTime: "N/A",
    speaker: "N/A",
    creationDate: "2023-05-29",
    type: "text",
    language: "Japanese",
  },
  {
    src: "https://example.com/text2.txt",
    title: "Text 2",
    currentTime: "N/A",
    speaker: "N/A",
    creationDate: "2023-05-29",
    type: "text",
    language: "Japanese",
  },
  {
    src: "https://example.com/text2.txt",
    title: "Text 2",
    currentTime: "N/A",
    speaker: "N/A",
    creationDate: "2023-05-29",
    type: "text",
    language: "Japanese",
  },
];

function App() {
  return (
    <div className="w-full">
      <tbody className="">
        {sampleData.map((data, index) => (
          <TableRow key={index} videoData={data} />
        ))}
      </tbody>
    </div>
  );
}

export default App;
