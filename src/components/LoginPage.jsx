import React from "react";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dna } from "react-loader-spinner";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); // Using the useNavigate hook
  const [loading, setLoading] = useState(false); // Loading state

  function handleClick(events) {
    events.preventDefault();
    axios
      .post(
        "https://transvoxia.ngrok.io/login/",
        {
          headers: {
            "ngrok-skip-browser-warning": 123,
          },
        },
        {
          username: emailRef.current.value,
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
        if (response.status === 200) {
          sessionStorage.setItem("key", response.data.access);
          document.cookie +=
            "transvoxia-auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NjgyNzE4LCJpYXQiOjE2ODk2ODI0MTgsImp0aSI6IjcwOGUxZjViZmVhYzRkYTA4OGRiMTQxZWY2NjE4MTk3IiwidXNlcl9pZCI6OX0.0YdUDrss4VAeFdtXVSDxFpgJDQtpxMmNieT56favuQs;";
          setLoading(true); // Set loading state to true
          setTimeout(() => navigate("/service/medialibrary"), 2000); // Navigate after 2 seconds
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert("Please check your email and password");
        } else alert("Oops something went wrong please try it again later");
      });
  }

  // If loading is true, show the loader with full-screen white background
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
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
