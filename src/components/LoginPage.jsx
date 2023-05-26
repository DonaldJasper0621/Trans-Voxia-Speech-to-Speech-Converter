import React from "react";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
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
                <input type="email" required />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required />
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

              <button>Log in</button>
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
