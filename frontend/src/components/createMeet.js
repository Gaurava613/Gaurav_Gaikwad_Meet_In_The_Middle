import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/createMeet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateMeet = () => {
    const [meetName, setMeetName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const navigateToAllMeet = () => {
        navigate('/all-meets');
    };

    const createMeet = async (e) => {
        e.preventDefault();

        // Validation: Check if required fields are filled
        if (!meetName || !date || !time || !duration) {
            alert("Please fill in all required fields.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:4000/create-meet",
                {
                    meetName,
                    date,
                    time,
                    duration,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Meet created successfully!");
            setMeetName("");
            setDate("");
            setTime("");
            setDuration("");
            setDescription("");
        } catch (error) {
            console.error("Error creating meet:", error.response?.data || error.message);
            alert("Failed to create meet!");
        }
    };

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/meets");
            const uniqueProfiles = response.data.data.filter(
                (profile, index, self) =>
                    index ===
                    self.findIndex(
                        (p) => p.createdBy?.phoneNumber === profile.createdBy?.phoneNumber
                    )
            );
            setProfiles(uniqueProfiles);
        } catch (error) {
            console.error("Error fetching profiles:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="container">
            <div className="main-screen">
                <div className="screen-header">
                    <FontAwesomeIcon icon={faChevronLeft} onClick={navigateToAllMeet} />
                    <button onClick={createMeet} className="submit-btn" style={{ background: "none", color: "green" }}>
                        <b>CREATE</b>
                    </button>
                </div>

                <div className="container1">
                    <div className="createMeet">
                        <form onSubmit={createMeet}>
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Name of the Meeting"
                                    value={meetName}
                                    onChange={(e) => setMeetName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Short Description (Optional)"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container2" style={{ overflow: "auto" }}>
                    <div className="invitePeople">
                        {loading ? (
                            <p>Loading profiles...</p>
                        ) : profiles.length === 0 ? (
                            <p>No profiles available</p>
                        ) : (
                            profiles.map((profile) => (
                                <div className="contacts" key={profile._id}>
                                    <div className="profilePhoto">
                                        <img
                                            src={
                                                profile.createdBy?.profileImage
                                                    ? `http://localhost:4000/uploads/${profile.createdBy.profileImage}`
                                                    : "/default-profile.png"
                                            }
                                            alt={profile.createdBy?.userName || "Profile"}
                                            className="profile-img"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div className="contactCard">
                                        <div className="contactName">
                                            {profile.createdBy?.userName || "Unknown User"}
                                        </div>
                                        <button
                                            className="inviteAction"
                                            onClick={() => alert(`Invited ${profile.createdBy?.userName}`)}
                                        >
                                            INVITE
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeet;
