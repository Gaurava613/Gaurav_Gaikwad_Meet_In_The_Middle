import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../SignUP/signUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login')
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await fetch("http://localhost:4000/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, userName }),
      });
      const data = await response.json();
      console.log(data.message);
      alert(data.message); // Show success or error message
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="container">
      <div className="main-screen">
        <div className="screen-header"style={{display:"flex",flexDirection:"row-reverse"}} >
          {/* Apply conditional styling for the NEXT text */}
          <div
            style={{
              color: userName && phoneNumber && isChecked ? "lightgreen" : "gray",
              cursor:
                userName && phoneNumber && isChecked ? "pointer" : "not-allowed",              
            }}
            onClick={
              userName && phoneNumber && isChecked ? handleSubmit : null
            }
          >
            <b onClick={navigateToLogin}>NEXT</b>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container2">
            <label htmlFor="imageUpload">
              <img
                src={profileImage || "./images/profile.png"}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%", cursor: "pointer" }}
              />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setProfileImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <h3>Add Picture</h3>
          </div>

          <div className="formInputs">
            <input
              type="text"
              placeholder="+91"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        </form>

        <div className="term-condition">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)} // Update checkbox state
          />
          By continuing you agree to
          <a href="">Terms and Conditions</a>{" "}
          <div onClick={navigateToLogin} className="loginPage">
            / LogIn
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
