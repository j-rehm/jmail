import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/AppContext';

const NavBar = () => {
  const { userData } = useContext(UserContext);

  return (
    <nav className="nav-bar">
      <div className="page-container">
        <ul>
          <li><p className="nav-brand">Jmail</p></li>
          {userData.user?.address
            ? <li><Link to='inbox'>Inbox</Link></li>
            : <></>
          }
          <span className="nav-splitter" />
          {userData.user?.address
            ? <>
              <li><p>{userData.user.username}</p></li>
              <li><Link to='logout'>Log Out</Link></li>
              </>
            : <>
              <li><Link to='signup'>Sign Up</Link></li>
              <li><Link to='login'>Log In</Link></li>
              </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;