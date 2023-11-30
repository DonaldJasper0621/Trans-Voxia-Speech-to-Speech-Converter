import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import SubMenu from './SubMenu';
import { motion } from 'framer-motion';
import { Fade } from '@mui/material';
import './SideBar.css';

// * React icons
import { IoIosArrowBack } from 'react-icons/io';
import { SlSettings } from 'react-icons/sl';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineDatabase } from 'react-icons/hi';
import { TbReportAnalytics } from 'react-icons/tb';
import { RiBuilding3Line } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { MdMenu } from 'react-icons/md';
import { NavLink, useLocation, useRoutes } from 'react-router-dom';

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [tabClicked, setTabClicked] = useState(false);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
    setTabClicked(true);
  }, [pathname]);

  useEffect(() => {
    let timeout;
    if (tabClicked) {
      timeout = setTimeout(() => {
        setTabClicked(false);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [tabClicked]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: '16rem',
          opacity: 1,
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          opacity: 0,
          transition: {
            damping: 40,
            delay: tabClicked ? 0.3 : 0,
          },
        },
      }
    : {
        open: {
          width: '16rem',
          opacity: 1,
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: '4rem',
          opacity: 0,
          transition: {
            damping: 40,
            delay: tabClicked ? 0.3 : 0,
          },
        },
      };

  const subMenusList = [
    {
      name: 'build',
      icon: RiBuilding3Line,
      menus: ['auth', 'app settings', 'storage', 'hosting'],
    },
    {
      name: 'analytics',
      icon: TbReportAnalytics,
      menus: ['dashboard', 'realtime', 'events'],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? 'block' : 'hidden'
        } `}
      ></div>
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={open ? 'open' : 'closed'}
          className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
              overflow-hidden md:relative fixed
              h-screen"
        >
          <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
            <NavLink to="/">
              <img
                src="https://img.icons8.com/?size=512&id=leINkNcWQj4I&format=png"
                alt=""
                className="w-6 h-6"
              />
            </NavLink>
            <span className="text-xl whitespace-pre font-bold">Trans Voxia</span>
          </div>

          <div className="flex flex-col  h-full">
            <ul className="whitespace-pre px-2.5 py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100  md:h-[68%] h-[70%]">
              <li>
                <NavLink to={'/service/medialibrary'} className="link">
                  <AiOutlineAppstore size={23}/>
                  Media Library
                </NavLink>
              </li>
              <li>
                <NavLink to={'/service/processing'} className="link">
                  <BsPerson size={23}/>
                  Processing
                </NavLink>
              </li>
              <li>
                <NavLink to={'/service/gallery'} className="link">
                  <HiOutlineDatabase size={23}/>
                  Studio
                </NavLink>
              </li>

              {(open || isTabletMid) && (
                <div className="border-y py-2 border-slate-300 ">
                  <small className=" text-slate-500 inline-block mb-1 ">
                    Product categories
                  </small>
                  {subMenusList?.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      <SubMenu data={menu} />
                    </div>
                  ))}
                </div>
              )}
              <li>
                <NavLink to={'/settings'} className="link">
                  <SlSettings size={23}/>
                  Settings
                </NavLink>
              </li>
            </ul>
            {open && (
              <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
                <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                  <div>
                    <p>Spark</p>
                    <small>No-cost $0/month</small>
                  </div>
                  <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                    Upgrade
                  </p>
                </div>
              </div>
            )}
          </div>
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    x: -10,
                    y: -200,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} />
          </motion.div>
        </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
