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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';


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

function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const location = useLocation();
  const video = location.state.video;

  const [title, setTitle] = useState(video.title);
  const [transcript, setTranscript] = useState(video.transcript); // set this to video.transcript if it exists
  const [isEditing, setIsEditing] = useState([false, false]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleSubmit = async (field) => {
    const new_value = field === "title" ? title : transcript;

    try {
      const response = await axios.put(
        `http://140.119.19.16:8000/tasks/?taskID=${video.taskID}&field=${field}&new_value=${new_value}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (index) => {
    if (isEditing[index]) {
      // if currently editing
      handleSubmit(index === 0 ? "title" : "transcript"); // submit change
    }
    let newIsEditing = [...isEditing];
    newIsEditing[index] = !newIsEditing[index];
    setIsEditing(newIsEditing);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
          <Tab label="File Title" {...a11yProps(0)} />
          <Tab label="Transcript" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {isEditing[0] ? (
          <input type="text" value={title} onChange={handleTitleChange} />
        ) : (
          title
        )}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {isEditing[1] ? (
          <textarea
            style={{ width: "100%", minHeight: "300px" }}
            value={transcript}
            onChange={handleTranscriptChange}
          />
        ) : (
          transcript
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

  const [title, setTitle] = useState(video.title);
  const [transcript, setTranscript] = useState(video.transcript); // set this to video.transcript if it exists

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');


  const handleContinueTaskClick = (taskID) => (events) => {
    axios
      .post(`http://140.119.19.16:8000/continue_task/${taskID}/`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setTimeout(() => {
            setAlertType('success');
            setOpen(true);
          }, 1000);
        } else {
          alert(response.data.msg);
          setTimeout(() => {
            setAlertType('error');
            setOpen(true);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("任務未成功");
        setTimeout(() => {
          setAlertType('error');
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

  return (
    <div className="flex">
      <Sidebar />
      <Snackbar
  open={open}
  autoHideDuration={1500}
  onClose={() => setOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  {alertType === 'success' ? (
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
        <div className="flex items-center">
          <video
            src={video.mp4 || video.mp3}
            controls
            className="max-h-[150px] aspect-video"
          />
          <div className="ml-6 font-light">
            <div className="text-md font-semibold">{video.title}</div>
            <p className="text-sm text-gray-600">By {video.target_language}</p>
            <p>{video.status}</p>
          </div>
        </div>
        {/* <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Transcript:
        <textarea value={transcript} onChange={handleTranscriptChange} />
      </label>
      <button type="submit">
        Submit
      </button>
    </form> */}
    <button className="button-hold " onClick={handleContinueTaskClick(video.taskID)}>
          <div>
            <svg class="icon" viewBox="0 0 16 16">
              <polygon points="1.3,6.7 2.7,8.1 7,3.8 7,16 9,16 9,3.8 13.3,8.1 14.7,6.7 8,0"></polygon>
            </svg>
            <svg class="progress" viewBox="0 0 32 32">
              <circle r="8" cx="16" cy="16" />
            </svg>
            <svg class="tick" viewBox="0 0 24 24">
              <polyline points="18,7 11,16 6,12" />
            </svg>
          </div>
          Publish
        </button>
        <FloatingActionButtonZoom />
        
      </div>
    </div>
  );
};

export default EditTranscripts;
