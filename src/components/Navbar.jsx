import React, { useState } from 'react';
import './NavbarStyles.css';
import { Link } from 'react-router-dom';
import { BiAccessibility } from "react-icons/bi";
import { MenuItems } from './MenuItems';
import { motion } from "framer-motion"

function Navbar() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">makabaka</h1>
      <div className='menu-icons' onClick={handleClick}>
        <i 
          className={clicked ? "fa-solid fa-circle-xmark" : "fa-sharp fa-solid fa-bars"}
        ></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
            return(<motion.li key={index} whileHover={{ scale: 1.2 }}>
                <Link className={item.cName} to = {item.url}>
                <i className={item.icon}></i>{item.title}
                </Link>
              </motion.li>)
        })}
        <motion.li whileHover={{ scale: 1.4 }}>
        {sessionStorage.getItem("key") ? <Link to={"/logout"}>
        <button className='font font-semibold'>Log Out</button> 
        </Link> : <Link to={"/login"}>
        <button className='font font-semibold'>Log In</button> 
        </Link>}
        </motion.li>
      </ul>
    </nav>
  );
}

export default Navbar;
