import React, { useState } from "react";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://140.119.19.16:8001/tasks/?taskID=18&field=title&new_value=${title}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (index) => {
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
          <textarea value={transcript} onChange={handleTranscriptChange} />
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://140.119.19.16:8001/tasks/?taskID=18&field=title&new_value=${title}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto px-4 bg-slate-300">
        <video
          src={video.mp4 || video.mp3}
          controls
          className="max-h-[150px] aspect-video"
        />
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
        <FloatingActionButtonZoom />
      </div>
    </div>
  );
};

export default EditTranscripts;
