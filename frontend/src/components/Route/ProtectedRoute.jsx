import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../components/layouts/Loader'

const ProtectedRoute = ({ isAdmin , component: Component, ...rest  }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) return <Loader />;
    
    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin && user.role!== 'admin') {
        return <Navigate to="/" replace />;
    }
    

    return <Component {...rest} user={user} />;
}

export default ProtectedRoute