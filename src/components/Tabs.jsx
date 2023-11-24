import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import './bgStyles.css'

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
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}

      {!loading && (
        <>
          <div className="tabs flex items-center w-full justify-between">
            <div className="flex gap-8 ml-5 ">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex cursor-pointer items-center tab w-18 ${
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
            <div className=" flex mr-6 h-9 w-28 background-animate1 rounded-full items-center justify-center">
              
                <button
                    variant="outlined"
                    className="fixpart rounded-full h-8 w-25 hover:ease-in hover:bg-transparent text-black text-sm flex items-center justify-center"
                    onClick={handleUploadClick}
                  >
                  <IoCloudUploadOutline className="mr-2" size={19} />
                  Upload
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

// <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-justify rounded relative flex items-center justify-center border-spacing-5 w-auto p-2">
//                {/* Icon component */}
//                Create Folder
//              </button>