import React from "react";
import "./RegisterStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { username } from "react-lorem-ipsum";

function RegisterPage() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);

  function handleClick(events) {
    events.preventDefault();
    if (passwordRef.current.value === confirmpasswordRef.current.value) {
      axios
        .post("https://062b-140-119-19-91.ngrok-free.app/accounts/", {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password1: passwordRef.current.value,
          password2: confirmpasswordRef.current.value,
        })
        .then(function (response) {
          if (response.status === 201) location.href = "/login";
          console.log(response);
        })
        .catch(function (error) {
          if (error.response.status === 400 && error.response.data)
            alert(error.response.data);
          console.log(error);
        });
    } else {
      alert(
        "Please notify that password and confirmation password need to be equivalent"
      );
    }
  }

  return (
    <section>
      <div className="registerform-box">
        <div className="form-value">
          <form action="">
            <h2>Sign Up</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="text" required ref={usernameRef} />
              <label>Username</label>
            </div>
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
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required ref={confirmpasswordRef} />
              <label>Confirm Password</label>
            </div>
            <button onClick={handleClick}>Register</button>
            <div className="register">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
