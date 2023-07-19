import React from "react";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick(events) {
    events.preventDefault();
    axios
      .post(
        "http://140.119.19.16:8001/login/",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "X-CSRFToken":
              "vvZfHgsUs3fdyOjeeQlYMkobXpbrY5ydjKjWZHiZJ1xnlEREOlpqPGPLBfl1vCDh",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200)
          sessionStorage.setItem("key", response.data.access);
          document.cookie += "transvoxia-auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NjgyNzE4LCJpYXQiOjE2ODk2ODI0MTgsImp0aSI6IjcwOGUxZjViZmVhYzRkYTA4OGRiMTQxZWY2NjE4MTk3IiwidXNlcl9pZCI6OX0.0YdUDrss4VAeFdtXVSDxFpgJDQtpxMmNieT56favuQs;"
        console.log(response);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert("Please check your email and password");
          console.log(error);
        } else alert("Oops something went wrong please try it again later");
      });
  }

  return (
    <section>
      <motion.div
        className="ee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-box">
          <div className="form-value">
            <form action="">
              <h2>Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" required ref={emailRef} />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required ref={passwordRef} />
                <label>Password</label>
              </div>
              <div className="forget">
                <label className="checkbox">
                  <input type="checkbox" /> Remember Me
                </label>
                <a className="forgot-password" href="#">
                  Forget Password
                </a>
              </div>

              <button onClick={handleClick}>Log in</button>
              <div className="register">
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default LoginPage;
