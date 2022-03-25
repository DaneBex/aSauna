import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheckCircle
} from "@fortawesome/free-regular-svg-icons";
import { faGit, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './SignUpForm.css'
import { unPopulateProjects } from '../../store/project';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(unPopulateProjects())
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    let newErrors = []

    if (password !== repeatPassword) {
      newErrors.push('Passswords do not match')
    }

    if (!email.includes('@') || !email.includes('.com')) {
      newErrors.push('Email must be valid')
    }

    if (newErrors.length === 0) {
      const data = await dispatch(signUp(username, email, password));
      if (data) newErrors.push(data)
    }
    setErrors(newErrors)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoLogin = () => {
    return dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <div id='signup-page'>
      <div className='logo-top-left'>
        <img id='signup-logo-size' src='https://images.squarespace-cdn.com/content/v1/59ea7374f43b55a33fa5ef2d/1512168335216-W3W86GLO35W9UW05DP93/Asana+Logo.png?format=1000w' />
        <p className='signup-logo-text'>aSauna</p>
      </div>
    <form id='signup-form' onSubmit={onSignUp}>
      <h1 id='signup-form-title'>Sign up</h1>
      <p id='signup-terms'>By signing up, I agree to the aSauna Privacy Policy and Terms of Service.</p>
      <div>
        {errors.map((error, ind) => (
          <div className='signup-error' key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup-input'>
        <label>User Name</label>
        <input
          className='signup-input-input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div className='signup-input'>
        <label>Email</label>
        <input
          className='signup-input-input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div className='signup-input'>
        <label>Password</label>
        <input
          className='signup-input-input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div className='signup-input'>
        <label>Repeat Password</label>
        <input
         className='signup-input-input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        ></input>
      </div>
      <button className='signup-submit-button' type='submit'>Sign Up</button>
      <button className='signup-submit-button' onClick={demoLogin}>Demo User</button>
      <div id='signup-login-link'>
          <p>Have an account?</p>
          <NavLink id='navlink-signup' to={'/login'}>Login</NavLink>
        </div>
    </form>
    <div id='signup-right-side'>
    <img id='signup-form-image' src="https://luna1.co/005100.png" />
    <h2>Your plan includes</h2>
    <div className='signup-included'>
    <FontAwesomeIcon className='checkmark-icon' icon={faCheckCircle} />
    <p>Unlimited tasks and projects</p>
    </div>
    <div className='signup-included'>
    <FontAwesomeIcon className='checkmark-icon' icon={faCheckCircle} />
    <p>Unlimited storage</p>
    </div>
    <p>Plus much more...</p>
    <div className='git-linkedin-links'>
      <a target='_blank' href='https://github.com/DaneBex/aSauna'>
       <FontAwesomeIcon className='github-icon' icon={faGithub} />
      </a>
      <a target='_blank' href='https://www.linkedin.com/in/dane-becker-780571230/'>
        <FontAwesomeIcon className='linkedin-icon' icon={faLinkedin} />
      </a>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
