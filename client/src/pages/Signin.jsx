// SignInRegister.js
import React, { useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <div className="auth-form">
        <h1>Sign In / Register</h1>
        
        <form>

                <input 
                   type = "name"
                   placeholder= "Name"
                   value = {name}
                   onChange={(e)=>setName(e.target.value)}
                   className="input-field"
                />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="submit" className="btn">
              Sign Up
            </button>
            <button type="submit" className="btn">
              Sign In
            </button>
          </div>
        </form>

        {/* Google Sign-in Button */}
        <button className="google-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="google-logo" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
