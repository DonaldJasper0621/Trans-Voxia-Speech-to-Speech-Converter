import React, { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    console.log("e:", e);
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("files", e.target.files);
    }
  };

  const handleUploadClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/service/gallery");
      setLoading(false);
    }, 2000); // adjust this time as needed
  };

  return (
    <div className="overflow-x-hidden w-full">
      {loading && (
        <div className="loading fixed inset-0 flex items-center justify-center ml-20">
          <ScaleLoader color="#36d7b7" size={40} />
        </div>
      )}

      {!loading && (
        <>
          <div className="tabs flex items-center w-full  justify-between ">
            <div className="flex gap-8 ml-5">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex cursor-pointer items-center tab ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500"
                    : "hover:border-b-2 hover:border-blue-500"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </div>
            ))}
            </div>
            <div className="flex gap-7 mr-7">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-justify rounded relative flex items-center justify-center z-50 border-spacing-5 w-28 p-2"
                onClick={handleUploadClick}
              >
                <IoMdAddCircleOutline className="mr-2" />
                Upload
              </button>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-justify rounded relative flex items-center justify-center z-50 w-28 p-2">
                {/* Icon component */}
                Create Folder
              </button>
            </div>
          </div>

          <div className="tab-content w-full">
            {tabs.find((tab) => tab.id === activeTab).content}
          </div>
        </>
      )}
    </div>
  );
}

export default Tabs;
