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
      .post(`https://0e71-140-119-19-91.ngrok-free.app/stop_task/${taskID}/`)
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
        console.log;
        setTimeout(() => {
          setAlertConfig({ severity: "warning", message: "任務未成功" });
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1800);
        }, 1000);
      });
  };

  // const handleContinueTaskClick = (taskID) => (events) => {
  //   axios
  //     .post(`https://0e71-140-119-19-91.ngrok-free.app/continue_task/${taskID}/`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log(response);
  //         setTimeout(() => {
  //           setAlertConfig({
  //             severity: "success",
  //             message: "This is a success alert — check it out!",
  //           });
  //           setShowAlert(true);
  //           setTimeout(() => {
  //             setShowAlert(false);
  //           }, 1800);
  //         }, 1000);
  //       } else {
  //         setTimeout(() => {
  //           setAlertConfig({
  //             severity: "warning",
  //             message: "This is a warning alert — check it out!",
  //           });
  //           setShowAlert(true);
  //           setTimeout(() => {
  //             setShowAlert(false);
  //           }, 1800);
  //         }, 1000);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       setTimeout(() => {
  //         setAlertConfig({ severity: "warning", message: "任務未成功" });
  //         setShowAlert(true);
  //         setTimeout(() => {
  //           setShowAlert(false);
  //         }, 1800);
  //       }, 1000);
  //     });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://0e71-140-119-19-91.ngrok-free.app/tasks/?n=10&page=1",
          {
            headers: {
              "ngrok-skip-browser-warning": 123,
            },
          }
        );
        setApiData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Fetch new data every 10 seconds (10000 milliseconds)
    const timerId = setInterval(fetchData, 25000);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(timerId);
    };
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
              <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                  <h1 className="w-[800px] h-[30px] text-left text-black text-xl font-bold">
                    Direct Output Without Editing Transcripts
                  </h1>
                  <hr className="bg-gradient-to-r from-indigo-700 via-rose-400 to-indigo-700 w-auto h-[4px] "></hr>

                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {directVideos.map((video) => (
                      <div
                        key={video.taskID}
                        className="shadow-lg rounded-md p-4 h-[150px] flex"
                      >
                        <div className="rounded-lg ring-2 ring-slate-300 focus:ring-opacity-50 hover:ring-slate-600">
                          <video
                            src={video.mp4 || video.mp3}
                            controls
                            className="rounded-lg max-h-[120px] max-w-[210px] aspect-video"
                          />
                        </div>
                        <div className="ml-6 flex-auto">
                          <div className="text-md text-left font-semibold py-2">
                            {video.title}
                          </div>
                          <p className="text-sm text-left text-gray-600 font-serif italic">
                            By {video.target_language}
                          </p>
                        </div>
                        <div className="object-right-top flex justify-between py-4">
                          <p className="flex h-3 items-center text-md text-zinc-700">
                            {video.status}
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
                              ]}
                              className="flex"
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div>
                  <h1 className="w-[800px] h-[30px] text-left text-black text-xl font-bold">
                    Output Videos That Transcripts Needed To Be Edited
                  </h1>
                  <hr className="bg-gradient-to-r from-indigo-700 via-rose-400 to-indigo-700 w-auto h-[4px] "></hr>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {editVideos.map((video) => (
                      <div
                        key={video.taskID}
                        className="shadow-lg rounded-md p-4 flex"
                      >
                        <div className="rounded-lg ring-2 ring-slate-300 focus:ring-opacity-50 hover:ring-slate-600">
                          <video
                            src={video.mp4 || video.mp3}
                            controls
                            className="rounded-lg max-h-[120px] max-w-[210px] aspect-video"
                          />
                        </div>
                        <div className="ml-6 flex-auto">
                          <div className="text-md text-left font-semibold py-2">
                            {video.title}
                          </div>
                          <p className="text-sm text-left text-gray-600 font-serif italic">
                            By {video.target_language}
                          </p>
                        </div>
                        <div className="object-right-top flex justify-between py-4">
                          <p className="flex h-3 items-center text-md text-zinc-700">
                            {video.status}
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
                                  onClick: handleContinueTaskClick(
                                    video.taskID
                                  ),
                                },
                              ]}
                              className="flex"
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </Fade>
        </>
      )}
    </div>
  );
};

export default Processing;
