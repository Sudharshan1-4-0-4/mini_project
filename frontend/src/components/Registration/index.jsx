import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import CartContext from "../../context/CartContext";
import Cookies from 'js-cookie';

import "./index.css";

const Registration = ({ details }) => {
  // const [user_name, setName] = useState("");
  const [ph_no, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const job_name = details.job_name;

  const user_name = Cookies.get("user_name");

  console.log("ammoo");
  console.log(details);

  const image = details.image;
  const employment_type = details.employment_type;
  const packages = details.package;
  const location = details.localtion;

  const id = details.id;
  // const { nameAdd } = useContext(CartContext);
  
//   const {nameAdd} = useContext(CartContext);

  const navigate = useNavigate();

  // const onChangeUsername = (event) => {
  //   setName(event.target.value);
  // };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePhno = (event) => {
    setPhno(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (ph_no.length !== 10) {
      setShowSubmitError(true);
      setErrorMsg("Phone number must be 10 digits");
      return; // Don't proceed with form submission
    }

    const userDetails = { id, job_name, user_name, ph_no, email, image, employment_type, packages, location };
    const url = "http://localhost:4001/registrations/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        alert("registration successfull...");
        setName("");
        setEmail("");
        setPhno("");
        
        // nameAdd(user_name);
        
        
      } else {
        alert("already job applied...");
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div className="orders-container">
      <form className="form1-container1" onSubmit={submitForm}>
        <p className="heading">👉...Jobby-Platform...👈</p>
        <div className="input-container1">
          <label className="input-label1" htmlFor="course_id">
            ID
          </label>
          <input
            type="text"
            id="course_id"
            value={id}
            className="username-input-field"
            readOnly
          />
        </div>
        <div className="input-container1">
          <label className="input-label1" htmlFor="course_name">
            JOB_NAME
          </label>
          <input
            type="text"
            id="course_name"
            value={job_name}
            className="username-input-field"
            readOnly
          />
        </div>
        <div className="input-container1">
          <label className="input-label1" htmlFor="user_name">
            USER_NAME
          </label>
          <input
            type="text"
            id="user_name"
            value={user_name}
            className="username-input-field"
            // onChange={onChangeUsername}
          />
        </div>
        <div className="input-container1">
          <label className="input-label1" htmlFor="amount">
            PHONE_NUMBER
          </label>
          <input
            type="text"
            id="amount"
            value={ph_no}
            className="password-input-field"
            onChange={onChangePhno}
            placeholder="phone number"
          />
        </div>
        <div className="input-container1">
          <label className="input-label1" htmlFor="amount">
            EMAIL
          </label>
          <input
            type="email"
            id="amount"
            value={email}
            className="password-input-field"
            onChange={onChangeEmail}
            placeholder="email"
          />
        </div>
        <button type="submit" className="login-button1">
          Submit
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
     
    </div>
  );
};

export default Registration;
