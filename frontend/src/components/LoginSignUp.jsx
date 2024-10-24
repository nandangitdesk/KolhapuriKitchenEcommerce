import React, { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser, clearErrors } from "../actions/userAction";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("..assets/images/default-avatar.webp");
  const [avatarPreview, setAvatarPreview] = useState(
    "..assets/images/default-avatar.webp"
  );
  const [activeTab, setActiveTab] = useState("login");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log("Avatar data:", avatar);
    dispatch(registerUser(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (tab) => {
    setActiveTab(tab);
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect); // Ensure navigation works
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]); // Changed from history to navigate and added redirect to dependency array

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <MetaData title="Login/Signup" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex mb-6 relative">
          <button
            onClick={() => switchTabs("login")}
            className={`w-1/2 text-center py-2 cursor-pointer transition-colors ${
              activeTab === "login" ? "text-red-500" : "text-gray-600"
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => switchTabs("signup")}
            className={`w-1/2 text-center py-2 cursor-pointer transition-colors ${
              activeTab === "signup" ? "text-red-500" : "text-gray-600"
            }`}
          >
            SIGNUP
          </button>
          <div
            className={`absolute bottom-0 w-1/2 h-0.5 bg-red-500 transition-all duration-300 ease-in-out ${
              activeTab === "signup" ? "left-1/2" : "left-0"
            }`}
          ></div>
        </div>

        {activeTab === "login" && (
          <form onSubmit={loginSubmit} className="mt-6 space-y-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <MailOutlineIcon className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <LockOpenIcon className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-gray-700 focus:outline-none"
                minLength="8"
              />
            </div>
            <Link
              to="/password/forgot"
              className="block text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              disabled={!loginEmail || !loginPassword}
            >
              Login
            </button>
          </form>
        )}

        {activeTab === "signup" && (
          <form
            onSubmit={signupSubmit}
            encType="multipart/form-data"
            className="mt-6 space-y-4"
          >
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaceIcon className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={registerDataChange}
                name="name"
                className="w-full text-gray-700 focus:outline-none"
                minLength="2"
                maxLength="50"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <MailOutlineIcon className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                name="email"
                onChange={registerDataChange}
                className="w-full text-gray-700 focus:outline-none"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <LockOpenIcon className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={registerDataChange}
                className="w-full text-gray-700 focus:outline-none"
                minLength="8"
              />
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-12 h-12 rounded-full"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              disabled={!name || !email || !password || !avatar}
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
