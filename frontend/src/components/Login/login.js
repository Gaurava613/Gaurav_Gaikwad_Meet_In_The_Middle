//login.js
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigateToAllMeet = () => {
    navigate('/all-meets')
  }
  const navigateToSignup = () => {
    navigate('/')
  }
  const handleLogin = async (e) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, userName }),
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.token; // Extract the token from the response
      localStorage.setItem("token", token); // Store the token securely
      console.log("Login Successful", data);
      navigateToAllMeet();
     
    } else {
      console.log("Login Error", data.message);
      setError(error.response?.data?.msg || "Invalid User", error);

    }
  };


  return (<div>
    <div className="container">
      <div className="main-screen">
        <div className="screen-header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={navigateToSignup} />
          {/* Apply conditional styling for the NEXT text */}
          <div
            style={{
              color: userName && phoneNumber ? "lightgreen" : "gray",
              cursor:
                userName && phoneNumber ? "pointer" : "not-allowed",
            }}
            onClick={
              userName && phoneNumber ? handleLogin : null 
            }
          >
            <b>NEXT</b>
          </div>
        </div>
        <form onSubmit={handleLogin}>

          <div className="container2">
            <img src="./images/phone.png" alt="img" />
            <div className="container2-text">
              <h1>LogIn</h1>
            </div>
          </div>

          <div className="formInputs">

            <input type=" text" placeholder="+91"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} />

            <input type="text" placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} />

          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

        </form>
      </div>
    </div>
  </div>
  )
}

export default Login; 