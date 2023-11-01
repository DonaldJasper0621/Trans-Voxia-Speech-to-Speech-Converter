import qs from "qs";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import axios from "axios";
import "./Publish.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function FloatingActionButtonZoom({
  value,
  formattedTitleForDisplay,
  formattedTransForDisplay,
  handleTitleChange,
  handleTranscriptChange,
  handleEditClick,
  handleChange,
  theme,
  isEditing,
  formatBoxedLayout,
  handleChangeIndex,
}) {
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
      onClick: () => handleEditClick(0),
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
      onClick: () => handleEditClick(1),
    },
    {
      color: "inherit",
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 1200,
        position: "relative",
        minHeight: 500,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Original Transcript" {...a11yProps(0)} />
          <Tab label="Translated Transcript" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
<TabPanel value={value} index={0} dir={theme.direction}>
    {isEditing[0] ? (
        <textarea
            style={{ width: "100%", minHeight: "300px" }}
            value={formattedTitleForDisplay}
            onChange={handleTitleChange}
        />
    ) : (
        formattedTitleForDisplay
            .split("\n\n")
            .map((box, index) => (
                <pre key={index} style={{ whiteSpace: 'pre-wrap', border: '1px solid', padding: '10px', marginBottom: '10px' }}>
                    {box}
                </pre>
            ))
    )}
</TabPanel>

<TabPanel value={value} index={1} dir={theme.direction}>
    {isEditing[1] ? (
        <textarea
            style={{ width: "100%", minHeight: "300px" }}
            value={formattedTransForDisplay}
            onChange={handleTranscriptChange}
        />
    ) : (
        formattedTransForDisplay
            .split("\n\n")
            .map((box, index) => (
                <pre key={index} style={{ whiteSpace: 'pre-wrap', border: '1px solid', padding: '10px', marginBottom: '10px' }}>
                    {box}
                </pre>
            ))
    )}
</TabPanel>

      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            sx={fab.sx}
            aria-label={fab.label}
            color={fab.color}
            onClick={fab.onClick}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}

const EditTranscripts = () => {
  const location = useLocation();
  const video = location.state.video;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [istranscripttype, setistranscripttype] = useState(
    "original_transcript"
  );

  const extractedTranscript = video.transcript.map((item) => {
    const [first, second, third, fourth, fifth] = item;
    return [first, second, third, fourth, fifth];
  });

  const extractedTransTranscript = video.transcript.map((item) => {
    const [first, second, third, fourth, fifth] = item; // Notice the double comma before fifth
    return [first, second, third, fourth, fifth];
  });

  const [title, setTitle] = useState(extractedTranscript);
  const [transcript, setTranscript] = useState(extractedTransTranscript);

  const formatBoxedLayout = (items) => {
    if (!items || items.length < 5) {
        return "Incomplete Data"; // Placeholder message for incorrect data format
    }
    let boundary = "---------------------";
    let boxContent = [
        `[${items[0] || "---"}]`,
        `Start: ${items[1] || "---"} | End: ${items[2] || "---"}`,
        items[3] || "---",
        items[4] || "---" // This will include the translated transcript
    ];
    return [boundary, ...boxContent, boundary].join("\n");
};


const formatTitleForDisplay = (titleArray) => {
    return titleArray
        .map((item) => {
            const [first="---", second="---", third="---", fourth="---"] = item;
            return formatBoxedLayout([first, second, third, fourth, "---"]);
        })
        .join("\n\n");
};

const formatTransForDisplay = (transArray) => {
    return transArray
        .map((item) => {
            const [first="---", second="---", third="---", fourth="---", fifth="---"] = item;
            return formatBoxedLayout([first, second, third, fourth, fifth]);
        })
        .join("\n\n");
};


  const formattedTitleForDisplay = formatTitleForDisplay(title);
  const formattedTransForDisplay = formatTransForDisplay(transcript);

  // set this to video.transcript if it exists
  const [isEditing, setIsEditing] = useState([false, false]);

  const parseBoxedContent = (boxedString) => {
    // Split by newline
    const lines = boxedString.trim().split("\n");
    if (lines.length < 5) return ["---", "---", "---", "---", "---"];
    const speaker = lines[1].replace(/\[|\]/g, '').trim();
    const times = lines[2].split('|');
    const start = times[0]?.split(':')[1]?.trim() || "---";
    const end = times[1]?.split(':')[1]?.trim() || "---";
    const content = lines[3] || "---";
    const translatedContent = lines[4] || "---";  // Extracting translated content
    return [speaker, start, end, content, translatedContent];
};


const handleTitleChange = (event) => {
    // Split the textarea content by double newline (i.e., by box)
    const boxes = event.target.value.split("\n\n");
    // Convert each box back into an array
    const updatedTitle = boxes.map(box => parseBoxedContent(box));
    setTitle(updatedTitle);
};

const handleTranscriptChange = (event) => {
    // Split the textarea content by double newline (i.e., by box)
    const boxes = event.target.value.split("\n\n");
    // Convert each box back into an array
    const updatedTrans = boxes.map(box => parseBoxedContent(box));
    setTranscript(updatedTrans);
};


  // const handleTitleChange = (event) => {
  //   // Split the input by newline to get each line
  //   const lines = event.target.value.split("\n");

  //   // Convert each line back into an array
  //   const updatedTitle = lines.map((line) => line.split(","));

  //   setTitle(updatedTitle);
  // };

  // const handleTranscriptChange = (event) => {
  //   // Split the input by newline to get each line
  //   const lines = event.target.value.split("\n");

  //   // Convert each line back into an array
  //   const updatedTrans = lines.map((line) => line.split(","));

  //   setTranscript(updatedTrans);
  // };
  // const handleSubmit = async (field) => {
  //   const new_value = field === "original_transcript" ? title : transcript;

  //   try {
  //     const response = await axios.put(
  //       `http://140.119.19.16:8000/tasks/?taskID=${video.taskID}&field=${field}&new_value=${new_value}`
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleEditClick = (index) => {
    if (isEditing[index]) {
      // if currently editing
      handleSubmit(index === 0 ? "original_transcript" : "modified_transcript"); // submit change
    }
    let newIsEditing = [...isEditing];
    newIsEditing[index] = !newIsEditing[index];
    setIsEditing(newIsEditing);
  };
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue === 0) {
      setistranscripttype("original_transcript");
    }
    if (newValue === 1) {
      setistranscripttype("modified_transcript");
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    axios
      .get("https://0e71-140-119-19-91.ngrok-free.app/voices/", {
        headers: {
          "ngrok-skip-browser-warning": 123,
        },
      })
      .then((response) => {
        setVoices(response.data);
        setpostvoice(
          Array.from({ length: video.speaker_counts }, () => {
            return response.data[video.target_language].usable_voices[0];
          })
        );
        setVoiceLanguageSelect(video.target_language);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleContinueTaskClick = (taskID) => (events) => {
    // Determine the field based on whether we are working with the original or modified transcript
    let new_value =
      istranscripttype === "original_transcript" ? title : transcript;

    // Convert the field array to the appropriate format
    // let fieldFormatted = field.map((item) => item.join(",")).join("\n");

    // Form the URL with the required query parameters
    let url = `https://0e71-140-119-19-91.ngrok-free.app/continue_task/${taskID}/`;
    console.log("URL:", url);
    console.log("Headers:", {
      "ngrok-skip-browser-warning": 123,
    });
    axios
      .post(
        url,
        JSON.stringify({
          new_transcript: new_value,
          voice_list: postvoice,
          fix_which_field: istranscripttype,
        }),
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setTimeout(() => {
            setAlertType("success");
            setOpen(true);
            setTimeout(() => {
              setLoading(true);
              setTimeout(() => {
                navigate("/service/processing");
              }, 2000);
            }, 1000);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("任務未成功");
        setTimeout(() => {
          setAlertType("error");
          setOpen(true);
        }, 1000);
      });
  };

  const [duration, setDuration] = useState(0);

  const success = (button) => {
    //Success function
    button.classList.add("success");
  };

  useEffect(() => {
    document.querySelectorAll(".button-hold").forEach((button) => {
      button.style.setProperty("--duration", duration + "ms");
      ["mousedown", "touchstart", "keypress"].forEach((e) => {
        button.addEventListener(e, (ev) => {
          if (
            e != "keypress" ||
            (e == "keypress" &&
              ev.which == 32 &&
              !button.classList.contains("process"))
          ) {
            button.classList.add("process");
            button.timeout = setTimeout(success, duration, button);
          }
        });
      });
      ["mouseup", "mouseout", "touchend", "keyup"].forEach((e) => {
        button.addEventListener(
          e,
          (ev) => {
            if (e != "keyup" || (e == "keyup" && ev.which == 32)) {
              button.classList.remove("process");
              clearTimeout(button.timeout);
            }
          },
          false
        );
      });
    });
  }, []);
  const [voicelanguageselect, setVoiceLanguageSelect] = useState("");
  const [voices, setVoices] = useState({});
  const [postvoice, setpostvoice] = useState([]);
  const handleVoiceLanguageChange = (speakerNumber) => (events) => {
    setpostvoice((prevArray) =>
      prevArray.map((val, i) => {
        if (i === speakerNumber - 1) {
          return events.target.value;
        } else {
          return val;
        }
      })
    );
  };

  return (
    <div className="flex">
      <Sidebar />

      {loading && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
          <HashLoader color="#36d7b7" size={150} />
        </div>
      )}

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {alertType === "success" ? (
          <Alert severity="success" onClose={() => setOpen(false)}>
            This is a success alert — check it out!
          </Alert>
        ) : (
          <Alert severity="error" onClose={() => setOpen(false)}>
            This is an error alert — check it out!
          </Alert>
        )}
      </Snackbar>

      <div className="container mx-auto px-4 bg-slate-300">
        <div className="mb-4">
          {/* <video
            src={video.mp4 || video.mp3}
            controls
            className="max-h-[150px] aspect-video"
          /> */}
          <div className="ml-6 font-light">
            <div className="text-md font-semibold">{video.title}</div>
            <p className="text-sm text-gray-600">By {video.target_language}</p>
            <p>{video.status}</p>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[200px] mb-4">
          {Array.from({ length: video.speaker_counts }, (_, i) => {
            const speakerNumber = i + 1;
            let speakerLabel;

            switch (speakerNumber) {
              case 1:
                speakerLabel = "Speaker 1 Voices";
                break;
              case 2:
                speakerLabel = "Speaker 2 Voices";
                break;
              case 3:
                speakerLabel = "Speaker 3 Voices";
                break;
              default:
                speakerLabel = `Speaker ${speakerNumber} Voices`;
                break;
            }

            return (
              <div key={`dropdown-container-${i}`}>
                <div className="block">
                  <label
                    htmlFor={`voice-dropdown-${i}`}
                    className="mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    {speakerLabel}
                  </label>
                  <select
                    onChange={handleVoiceLanguageChange(speakerNumber)}
                    id={`voice-dropdown-${i}`}
                    className="w-96 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {voices[voicelanguageselect] &&
                      voices[voicelanguageselect].usable_voices.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="button-hold"
          onClick={handleContinueTaskClick(video.taskID)}
        >
          <div>
            <svg className="icon" viewBox="0 0 16 16">
              <polygon points="1.3,6.7 2.7,8.1 7,3.8 7,16 9,16 9,3.8 13.3,8.1 14.7,6.7 8,0"></polygon>
            </svg>
            <svg className="progress" viewBox="0 0 32 32">
              <circle r="8" cx="16" cy="16" />
            </svg>
            <svg className="tick" viewBox="0 0 24 24">
              <polyline points="18,7 11,16 6,12" />
            </svg>
          </div>
          Publish
        </button>

        <FloatingActionButtonZoom
          formattedTitleForDisplay={formattedTitleForDisplay}
          formattedTransForDisplay={formattedTransForDisplay}
          value={value}
          handleTitleChange={handleTitleChange}
          handleTranscriptChange={handleTranscriptChange}
          handleEditClick={handleEditClick}
          handleChange={handleChange}
          handleChangeIndex={handleChangeIndex}
          theme={theme}
          isEditing={isEditing}
          formatBoxedLayout ={formatBoxedLayout}
        />
      </div>
    </div>
  );
};

export default EditTranscripts;


