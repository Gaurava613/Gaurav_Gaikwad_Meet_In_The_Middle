// allMeets.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../AllMeetings/allMeets.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronLeft, faCirclePlus, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const AllMeets = () => {
  const [meetings, setMeetings] = useState([]); // State to store all meetings
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const navigateToCreateMeet = () => {
    navigate('/create-meet')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  // Fetch meetings from backend when the component loads
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/meets"); // Using Axios GET request
        setMeetings(response.data.data); // Accessing 'data' field from Axios response
      } catch (err) {
        console.error("Error fetching meetings:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="container">
      <div className="main-screen">
        <div className="screen-header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={navigateToLogin} style={{cursor:"pointer"}} />
          <div>YOUR MEETINGS</div>
          <div className="createMeetBtn" onClick={navigateToCreateMeet}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}

        {!loading && !error && (
          <div>
            {meetings.length === 0 ? (
              <p>No meetings found.</p>
            ) : (
              <div className="allMeetingsCard">
                {meetings.map((meet) => (
                  <div className="meetingCard"
                    key={meet._id}
                  >
                    <div className="meetingName">{meet.meetName}</div>
                    <div className="meetingCardDateTime">
                      <div className="meetCardDate"><FontAwesomeIcon icon={faCalendarDays} />
                        {new Date(meet.date).toLocaleDateString()}
                      </div>
                      <div className="meetCardTime"><FontAwesomeIcon icon={faClock} />
                        {meet.time}
                      </div>
                    </div>

                    <div className="durationAndCreatedBy">
                      <div className="duration">Duration: {meet.duration}</div>
                      <div className="invitedBy">
                        {meet.createdBy?.profileImage ? (
                          <img
                            src={`http://localhost:4000/uploads/${meet.createdBy.profileImage}`}
                            alt={meet.createdBy?.userName || "Profile"}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#ccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "10px",
                            }}
                          >
                            N/A
                          </div>
                        )}
                                                <p>Invited By:</p>

                        {meet.createdBy?.userName || "Unknown User"}
                      </div>

                    </div>

                    {meet.description && <p>{meet.description}</p>}
                    <div className="cardBottom">
                      <button style={{ color: "red", background: "white" }}>DECLINE</button>
                      <div className="buttonsDivide">|</div>
                      <button style={{ color: "blue", background: "white" }}>JOIN</button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default AllMeets;
