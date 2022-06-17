import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDB, setUserDB] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await axios.get(`http://localhost:4000/editProfile/${id}`);
      setUserDB(result.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDB({
      ...userDB,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    const { _id, username, email, password } = userDB;
    e.preventDefault();
    let result = await axios.put(`http://localhost:4000/editProfile/${id}`, {
      _id,
      username,
      email,
      password,
    });
    if (result) {
      alert("succesfully updated");
      navigate(`/profile/${id}`);
    }
  };
  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <label htmlFor="username">
        <input
          className="input-box"
          type="text"
          name="username"
          placeholder="username"
          value={userDB.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="email">
        <input
          className="input-box"
          type="text"
          name="email"
          placeholder="email"
          value={userDB.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="password">
        <input
          className="input-box"
          type="password"
          name="password"
          placeholder="password"
          value={userDB.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleClick} className="input-button">
        Save Changes
      </button>
      <button className="input-button">
        <Link to={`/profile/${id}`}>Cancel</Link>
      </button>
    </div>
  );
};

export default EditProfile;
