import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import About from "./components/about";
import ContactUs from "./components/contactUs";
import EditProfile from "./components/editProfile";
import AdminProfile from "./components/adminProfile";
import EditAdminProfile from "./components/editAdminProfile";
import PrivateComponent from "./components/privateComponent";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route element={<PrivateComponent />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editProfile/:id" element={<EditProfile />} />
          <Route path="/adminProfile/:id" element={<AdminProfile />} />
          <Route path="/editAdminProfile/:id" element={<EditAdminProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
