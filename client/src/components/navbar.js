import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/register");
  };
  return (
    <div>
      {auth ? (
        <ul className="main-nav">
          <li className="nav-list active">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list">
            {JSON.parse(auth).username === "admin" &&
            JSON.parse(auth).email === "admin123@admin.com" ? (
              <Link to={`/adminProfile/${JSON.parse(auth)._id}`}>
                AdminProfile
              </Link>
            ) : (
              <Link to={`/profile/${JSON.parse(auth)._id}`}>Profile</Link>
            )}
          </li>
          <li className="nav-list">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-list">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="nav-list right">
            <Link onClick={handleLogout} to="/register">
              Logout<strong> ({JSON.parse(auth).username})</strong>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="main-nav">
          <li className="nav-list active">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-list">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="nav-list right">
            <Link to="/register">Register</Link>
          </li>
          <li className="nav-list right">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
