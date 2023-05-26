import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const medialibrary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://140.119.19.16:8001/api/tasks/download/",
          {
            params: { email: "default@example.com", taskID: "54" },
            responseType: "blob",
          }
        );
        
        const AudioURL = URL.createObjectURL(new Blob([response.data]));
        setData(AudioURL);
        console.log(AudioURL);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <audio src={data} controls></audio>
      <a href={data} download="test.mp3">
        download
      </a>
    </>
  );
};
export default medialibrary;
// {
//   data.map((task, index) => (
//     <div key={task.taskID}>{`${task.title},${index}`}</div>
//   ));
// }
