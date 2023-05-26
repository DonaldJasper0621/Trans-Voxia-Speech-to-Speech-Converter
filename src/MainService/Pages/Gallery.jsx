import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import ModeSelection from "../../components/ModeSelection";




function gallery(){
    return( 
        <div className="flex">
    <Sidebar/>
    <ModeSelection/>
    </div>
    );
  };
  
  export default gallery;
  