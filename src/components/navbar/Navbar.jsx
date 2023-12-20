import React from 'react';
import './navbar.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <div className='wrapper'>
      <div className='navbar'>
     
     <div className='search-bar'>
       
       <input type="text" placeholder="Search..." />
       <button type="button">Search</button>
     </div>
     <div className='nav-right'>
    
     <Link to={"/login"} style={{textDecoration:"none"}}>
     <LockOpenIcon style={{ color: 'greenyellow' }}></LockOpenIcon>
     </Link>
     <NotificationsNoneIcon style={{ color: 'blueviolet' }}></NotificationsNoneIcon>
     <div className='profile-icon'>
     </div>
     </div>
   </div>
    </div>
  );
};
