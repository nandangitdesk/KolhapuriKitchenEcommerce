import React from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userAction';

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart);

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    const actions = [
        
        { icon: <PersonIcon />, name: 'Profile', action: () => navigate('/account') },
        { icon: <ExitToAppIcon />, name: 'Logout', action: logoutHandler },
        { icon: <ListAltIcon />, name: 'Orders', action: () => navigate('/orders') },
        { icon: <ShoppingCartIcon />, name: `cart(${cartItems.length})`, action: () => navigate('/cart') },
    ];

    if(user.role === "admin"){
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard', action: () => navigate('/admin/dashboard') })
    }

    



  return (
    <div className='fixed bottom-9 right-0 z-50'>
        <Backdrop open={open} />
        <SpeedDial
            ariaLabel='User Options'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction='up'
            icon={<img className='rounded-full w-12 h-12 hover:shadow-lg' src={user.avatar?.url || "../assets/images/default-avatar.webp"} alt="User Avatar" />}
            
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                        action.action();
                        setOpen(false);
                    }}
                    
                />
            ))}
        </SpeedDial>
    </div>
  )
}

export default UserOptions