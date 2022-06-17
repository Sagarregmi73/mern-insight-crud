import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const { id } = useParams();
  const [userDB, setUserDB] = useState("");
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      let result = await axios.get(`http://localhost:4000/editProfile/${id}`);
      setUserDB(result.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h2> welcome {userDB.username}!</h2>
      <p>your email is {userDB.email}</p>
      <br />
      <button className="input-button">
        <Link to={`/editProfile/${id}`}>Edit Profile</Link>
      </button>
    </div>
  );
};

export default Profile;
