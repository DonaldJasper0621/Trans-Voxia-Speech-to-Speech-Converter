import { motion } from "framer-motion";
import "./heroStyles.css";
import { useCallback } from "react";

import { loadFull } from "tsparticles";


function Hero(props) {
  return (
    <>
      <div className={props.cName}>
      
        <img alt="HerpImg" src={props.heroImg} />
        
        <div className="hero-text">
          <motion.div
            className="ee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className={props.btnClass}>
              {props.buttonText}
            </a>
          </motion.div>
        </div>
        
        
      </div>
    </>
  );
}

export default Hero;
