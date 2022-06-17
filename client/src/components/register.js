import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (username === "" || email === "" || password === "") {
      return alert("please fill input data");
    }
    if (regex.test(email) === false) {
      return alert("invalid email");
    }
    let result = await axios.post("http://localhost:4000/register", {
      username,
      email,
      password,
    });

    console.log(result.data);
    localStorage.setItem("user", JSON.stringify(result.data));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <label htmlFor="username">
        <input
          className="input-box"
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
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
          value={user.email}
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
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleClick} className="input-button">
        Register
      </button>
      <span>
        <Link to="/login">Already Registered</Link>
      </span>
    </div>
  );
};

export default Register;
