import React, { useContext, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index1.css';
import CartContext from '../../context/CartContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {nameAdd} = useContext(CartContext);

  const navigate = useNavigate();
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    Cookies.set('user_name', username, { expires: 30 });
    Cookies.set('password', password, {expires:30});
    nameAdd(username);
    navigate("/"); 
  };

  

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const apiUrl = 'http://localhost:4001/login/';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      console.log("hellp");
      console.log(data.jwtToken);
      onSubmitSuccess(data.jwtToken);
    } else {
      console.log("err");
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
      setPassword("");
      setUsername("");
    }
  };

  const token = Cookies.get('jwt_token');
  if (token !== undefined) {
    navigate("/");
  }

  return (
    <div className="login-container1">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="login-website-logo"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>

        {showSubmitError && <p className="error-message1">*{errorMsg}</p>}
        <div className="signup-link-container">
          <p className="sign-link-text">
            Don't have an account?{" "}
            <Link to="/signIn" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
