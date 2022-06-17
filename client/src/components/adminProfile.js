import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AdminProfile = () => {
  const [userDB, setUserDB] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  });
  const auth = localStorage.getItem("user");

  const fetchData = async () => {
    try {
      let result = await axios.get(`http://localhost:4000/adminProfile`);
      setUserDB(result.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (userId) => {
    let result = await axios.delete(
      `http://localhost:4000/deleteProfile/${userId}`
    );
    if (result) {
      alert("succesfully deleted");
      navigate("/");
    }
  };

  return (
    <div>
      <h2> welcome {JSON.parse(auth).username} !</h2>
      <p>your email is {JSON.parse(auth).email}</p>
      <p>Please check the list of users:</p>
      <br />
      {userDB.map((user) => {
        return (
          <div key={user._id}>
            <h3>UserName:{user.username}</h3>
            <h3>email:{user.email}</h3>
            <h3>password:{user.password}</h3>
            <button className="input-button">
              <Link to={`/editAdminProfile/${user._id}`}>Edit Profile</Link>
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="input-button"
            >
              Delete Profile
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default AdminProfile;
