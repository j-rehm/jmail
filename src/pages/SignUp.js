import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '@aws-amplify/auth';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitSignUpForm = async evt => {
    evt.preventDefault();
    setError('');
    if (password === confirm) {
      try {
        let cognitoUser = await Auth.signUp({
          username,
          password,
          attributes: {
            given_name: firstName,
            family_name: lastName,
            address: `${username}@jmail.com`
          }
        });
        console.log(cognitoUser);
        setRedirect(true);
      } catch (err) {
        switch (err.code) {
          case 'UsernameExistsException':
            setError('That username is taken!');
            break;
          case 'InvalidParameterException':
            setError('Password must be at least 6 characters');
            break;
          default:
            setError('An unknown error occured');
            console.log(err);
        }
      }
    } else setError('Passwords do not match');
  }

  if (redirect) return <Redirect to='/login' />;
  else {
    return (
      <form className="auth-form"
            onSubmit={submitSignUpForm}>
        <h2 className="form-header">Sign Up</h2>
  
        <label className="form-input-label"
               htmlFor="first-name">First Name</label>
        <input className="form-input-field"
               value={firstName}
               id="first-name"
               required
               onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
  
        <label className="form-input-label"
               htmlFor="last-name">Last Name</label>
        <input className="form-input-field"
               value={lastName}
               id="last-name"
               required
               onChange={(e) => setLastName(e.target.value)}
        />
        <br />
  
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
               htmlFor="password">Password</label>
        <input className="form-input-field"
               value={password}
               type="password"
               id="password"
               required
               onChange={(e) => setPassword(e.target.value)}
        />
        <br />
  
        <label className="form-input-label"
               htmlFor="confirm">Confirm</label>
        <input className="form-input-field"
               value={confirm}
               type="password"
               id="confirm"
               required
               onChange={(e) => setConfirm(e.target.value)}
        />
        <br />
  
        <span className="form-text">Already have an account? <Link to="/login">Log in</Link></span>
        <br />
  
        <input className="form-submit-btn"
               type="submit"
               name="Sign Up"
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

export default SignUp;