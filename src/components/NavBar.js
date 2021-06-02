import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/AppContext';

const NavBar = () => {
  const { userData } = useContext(UserContext);

  return (
    <>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/compose'>Compose</Link></li>
        {userData.user?.address
          ? <>
            <li>{userData.user.address}</li>
            <li><Link to='/logout'>Log Out</Link></li>
            </>
          : <>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li><Link to='/login'>Log In</Link></li>
            </>
        }
      </ul>
    </nav>
    </>
  );
}

export default NavBar;