import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../actions/userAction'; // Make sure this action exists
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from './layouts/Loader';
import MetaData from './layouts/MetaData';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const { token } = useParams(); 
  const { loading, success, error } = useSelector(state => state.forgotPassword);

  const handleSubmit = (e) => { 
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);
    
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
        alert(error);
        dispatch(clearErrors())
    }

    if (success) {
      alert('Password reset successfully. Please login with your new password.');
      navigate("/login")
      
    }
  }, [success,navigate,alert,error]);

  return (
    <>
    {loading ? <Loader /> : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <MetaData title="Reset Password" />
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${loading && 'opacity-50 cursor-not-allowed'}`}
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
          {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      </div>
    )}
    </>
  );
};

export default ResetPassword;
