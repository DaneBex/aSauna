import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGit, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './LoginForm.css'
import { populateProjectsByUser, unPopulateProjects } from '../../store/project';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)



  const onLogin = async (e) => {
    e.preventDefault();

    if (!email) setEmailError(true)
    if (!password) setPasswordError(true)


    if (email && password) {
      const data = dispatch(login(email, password));

      if (data) {
        setEmailError(true)
        setPasswordError(true)
      }
    };
  }

  useEffect(() => {
    dispatch(unPopulateProjects())
  }, [])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoLogin = () => {
    return dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <div className='background-login-form'>

      <form className='login-form' onSubmit={onLogin}>
        <div id='login-logo-div'>
          <img id='login-logo-size' src='https://images.squarespace-cdn.com/content/v1/59ea7374f43b55a33fa5ef2d/1512168335216-W3W86GLO35W9UW05DP93/Asana+Logo.png?format=1000w' />
          <h1>aSauna</h1>
        </div>
        <div id='login-demo-user'>
          <button onClick={demoLogin} className='login-demo-user-button'>Log in with Demo User</button>
        </div>
        <div className='line-or-line'>
          <span className='line-middle'></span>
          <span className='or-lines'>or</span>
          <span className='line-middle'></span>
        </div>
        <div className='form-fields'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-input'>
            <label className='login-input-label' htmlFor='email'>Email address</label>
            <input className='login-input-field'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            {emailError &&
              <p className='error-login'>Incorrect email</p>
            }
          </div>
          <div className='login-input'>
            <label className='login-input-label' htmlFor='password'>Password</label>
            <input className='login-input-field'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            {passwordError &&
              <p className='error-login'>Incorrect password</p>
            }
          </div>
          <button className='login-login-button' type='submit'>Login</button>
        </div>
        <div id='login-signup-link'>
          <p>Don't have an account?</p>
          <NavLink id='navlink-signup' to={'/sign-up'}>Sign up</NavLink>
        </div>
      </form>
      <div className='git-linkedin-links'>
        <a target='_blank' href='https://github.com/DaneBex/aSauna'>
          <FontAwesomeIcon className='github-icon' icon={faGithub} />
        </a>
        <a target='_blank' href='https://www.linkedin.com/in/dane-becker-780571230/'>
          <FontAwesomeIcon className='linkedin-icon' icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
