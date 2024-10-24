import React from 'react'
import MetaData from '../layouts/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
            <Navbar />
          <MetaData title={`${user.name}'s Profile`} />
          <div className="container mx-auto px-4 py-8 mt-20">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-100 p-8 text-center">
                  <img 
                    src={user.avatar?.url || "../assets/images/default-avatar.webp"} 
                    alt={user.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                  <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
                  <Link 
                    to="/me/update" 
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Edit Profile
                  </Link>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="mb-6">
                    <h4 className="text-gray-600 text-sm font-semibold mb-1">Full Name</h4>
                    <p className="text-gray-800 text-lg">{user.name}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-gray-600 text-sm font-semibold mb-1">Email</h4>
                    <p className="text-gray-800 text-lg">{user.email}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-gray-600 text-sm font-semibold mb-1">Joined On</h4>
                    <p className="text-gray-800 text-lg">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not available'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/orders" 
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/password/update" 
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile