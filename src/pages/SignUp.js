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
      <form className="auth-form card"
            onSubmit={submitSignUpForm}>
        <h2 className="form-header">Sign Up</h2>
  
        <input className="form-input-field"
               value={firstName}
               placeholder="First Name"
               required
               onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
  
        <input className="form-input-field"
               value={lastName}
               placeholder="Last Name"
               required
               onChange={(e) => setLastName(e.target.value)}
        />
        <br />
  
        <input className="form-input-field"
               value={username}
               placeholder="Username"
               required
               onChange={(e) => setUsername(e.target.value)}
        />
        <br />
  
        {/* <label className="form-input-label"
               htmlFor="password">Password</label> */}
        <input className="form-input-field"
               value={password}
               placeholder="Password"
               type="password"
               required
               onChange={(e) => setPassword(e.target.value)}
        />
        <br />
  
        <input className="form-input-field"
               value={confirm}
               placeholder="Confirm Password"
               type="password"
               required
               onChange={(e) => setConfirm(e.target.value)}
        />
        <br />
  
        <p className="form-text">Already have an account? <Link to="login">Log in</Link></p>
        <br />
  
        <input className="form-submit-btn"
               type="submit"
               value="Sign Up"
        />
        <br />
  
        {error
          ? <p className="form-error">{error}</p>
          : <></>
        }
      </form>
    );
  }
}

export default SignUp;