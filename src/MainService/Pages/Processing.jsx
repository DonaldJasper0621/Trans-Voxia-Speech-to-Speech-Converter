import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { Fade, Grow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LongMenu from "./LongMenu";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Processing = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showDirectOptions, setShowDirectOptions] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const threeDottedButtonRefs = useRef({});
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ severity: "", message: "" });

  // const handleDirectVideoOptions = (videoId) => {
  //   setSelectedVideoId(videoId);
  //   setShowDirectOptions(!showDirectOptions);
  // };

  const handleNaviagteEditTranscriptClick = (video) => {
    setLoading(true);
    setTimeout(() => {
      navigate("/service/edittranscripts", { state: { video } });
      setLoading(false);
    }, 2000); // adjust this time as needed
  };

  const handleEditVideoOptions = (videoId) => {
    setSelectedVideoId(videoId);
    setShowEditOptions(!showEditOptions);
  };

  const handleStopTaskClick = (taskID) => (events) => {
    axios
      .post(`http://140.119.19.16:8001/stop_task/${taskID}/`)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setAlertConfig({
              severity: "success",
              message: "This is a success alert — check it out!",
            });
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 1800);
          }, 1000);
        } else {
          setTimeout(() => {
            setAlertConfig({
              severity: "warning",
              message: "This is a warning alert — check it out!",
            });
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 1800);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setTimeout(() => {
          setAlertConfig({ severity: "warning", message: "任務未成功" });
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1800);
        }, 1000);
      });
  };

  const handleContinueTaskClick = (taskID) => (events) => {
    axios
      .post(`http://140.119.19.16:8001/continue_task/${taskID}/`)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setAlertConfig({
              severity: "success",
              message: "This is a success alert — check it out!",
            });
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 1800);
          }, 1000);
        } else {
          setTimeout(() => {
            setAlertConfig({
              severity: "warning",
              message: "This is a warning alert — check it out!",
            });
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 1800);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setTimeout(() => {
          setAlertConfig({ severity: "warning", message: "任務未成功" });
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1800);
        }, 1000);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://140.119.19.16:8001/tasks/?n=10&page=1"
        );
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;
      for (const ref of Object.values(threeDottedButtonRefs.current)) {
        if (ref.current && ref.current.contains(event.target)) {
          clickedInside = true;
          break;
        }
      }
      if (!clickedInside) {
        setShowDirectOptions(false);
        setShowEditOptions(false);
        setSelectedVideoId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const directVideos = apiData.filter((video) => !video.needModify);
  const editVideos = apiData.filter((video) => video.needModify);

  return (
    <div className="flex">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <ScaleLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          <Sidebar />
          <Snackbar
            open={showAlert}
            autoHideDuration={1800}
            onClose={() => setShowAlert(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={6}
              variant={
                alertConfig.severity === "success" ? "standard" : "filled"
              }
              severity={alertConfig.severity}
              onClose={() => setShowAlert(false)}
            >
              {alertConfig.message}
            </MuiAlert>
          </Snackbar>
          <Fade in={open} timeout={500}>
            <div className="w-full overflow-scroll h-screen">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h1 className="text-xl font-bold">
                    Direct Output Without Editing Transcripts
                  </h1>

                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {directVideos.map((video) => (
                      <div
                        key={video.taskID}
                        className="shadow-lg rounded-md p-4 flex"
                      >
                        <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                          <video
                            src={video.mp4 || video.mp3}
                            controls
                            className="max-h-[150px] aspect-video"
                          />
                        </div>
                        <div className="ml-6 font-light">
                          <div className="text-md font-semibold">
                            {video.title}
                          </div>
                          <p className="text-sm text-gray-600">
                            By {video.target_language}
                          </p>
                          <p>{video.status}</p>
                        </div>
                        <LongMenu
                          options={[
                            {
                              name: "Stop the task",
                              onClick: handleStopTaskClick(video.taskID),
                            },
                          ]}
                        ></LongMenu>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    Output Videos That Transcripts Needed To Be Edited
                  </h1>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {editVideos.map((video) => (
                      <div
                        key={video.taskID}
                        className="shadow-lg rounded-md p-4 flex"
                      >
                        <div className="rounded-lg overflow-hidden border border-slate-900 ring-4 ring-slate-400 focus:ring-opacity-50">
                          <video
                            src={video.mp4 || video.mp3}
                            controls
                            className="max-h-[150px] aspect-video"
                          />
                        </div>
                        <div className="ml-6 font-light">
                          <div className="text-md font-semibold">
                            {video.title}
                          </div>
                          <p className="text-sm text-gray-600">
                            By {video.target_language}
                          </p>
                          <p>{video.status}</p>
                        </div>

                        <LongMenu
                          options={[
                            {
                              name: "Edit Transcript",
                              onClick: () =>
                                handleNaviagteEditTranscriptClick(video),
                            },
                            {
                              name: "Stop the task",
                              onClick: handleStopTaskClick(video.taskID),
                            },
                            {
                              name: "Direct Output",
                              onClick: handleContinueTaskClick(video.taskID),
                            },
                          ]}
                        ></LongMenu>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </>
      )}
    </div>
  );
};

export default Processing;
