import React, { useContext, useState } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import UserContext from '../context/AppContext';

const LogIn = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');

  const submitLogInForm = async evt => {
    evt.preventDefault();
    setError('');
    try {
      let cognitoUser = await Auth.signIn(username, password);
      let user = {
        id: cognitoUser.attributes.sub,
        address: cognitoUser.attributes.address,
        username: cognitoUser.username,
        first_name: cognitoUser.attributes.given_name,
        last_name: cognitoUser.attributes.family_name
      }
      setUserData({ user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setError('Incorrect username or password');
          break;
        default:
          setError('An unknown error occured');
      }
    }
  }

  if (userData.user?.address) return <Redirect to="/" />;
  else {
    return (
      <form className="auth-form"
            onSubmit={submitLogInForm}>
        <h2 className="form-header">Log In</h2>
  
        <label className="form-input-label"
               htmlFor="username">Username</label>
        <input className="form-input-field"
               value={username}
               id="username"
               required
               onChange={(e) => setUsername(e.target.value)}
        />
        <br />
  
        <label className="form-input-label"
               htmlFor="username">Password</label>
        <input className="form-input-field"
               value={password}
               type="password"
               id="password"
               required
               onChange={(e) => setPassword(e.target.value)}
        />
        <br />
  
        <span className="form-text">Need an account? <Link to="/signup">Sign Up</Link></span>
        <br />

        <input className="form-submit-btn"
               type="submit"
               name="Log In"
        />
        <br />
  
        {error
          ? <span className="form-error">{error}</span>
          : <></>
        }
      </form>
    );
  }
}

export default LogIn;