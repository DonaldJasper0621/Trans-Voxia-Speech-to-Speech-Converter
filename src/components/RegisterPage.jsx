import React from 'react';
import "./LoginStyles.css";
import { Link } from 'react-router-dom';

function RegisterPage() {
    return(
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Sign Up</h2>
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
                        <button>Register</button>
                        <div className="register">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage;
