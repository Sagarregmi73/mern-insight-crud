import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
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
    const { email, password } = user;

    e.preventDefault();
    if (email === "" || password === "") {
      return alert("please fill input data");
    }

    let result = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });

    if (result.data.username) {
      console.log(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate(`/`);
    } else if (
      result.data.username === "admin" &&
      result.data.email === "admin123@admin.com"
    ) {
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate("/");
    } else {
      alert("please fill correct detail");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

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
        Login
      </button>
      <span>
        <Link to="/register">Not Registered yet!</Link>
      </span>
    </div>
  );
};

export default Login;
