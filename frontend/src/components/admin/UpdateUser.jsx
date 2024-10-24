import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import Navbar from '../layouts/Navbar';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import { UPDATE_USER_RESET } from '../../constants/userConstant';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layouts/Loader';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(id, myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-64 bg-gray-800 text-white">
          <SideBar />
        </div>
        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-6 md:mt-20 mt-16">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="bg-white shadow-md rounded-lg p-8"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Update User</h1>
              <div className="mb-4">
                <label className="flex items-center mb-2">
                  <Person className="mr-2 text-gray-600" />
                  <span className="text-gray-700">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center mb-2">
                  <MailOutline className="mr-2 text-gray-600" />
                  <span className="text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center mb-2">
                  <VerifiedUser className="mr-2 text-gray-600" />
                  <span className="text-gray-700">Role</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading || role === ""}
                variant="contained"
                color="primary"
                className="w-full py-2"
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
