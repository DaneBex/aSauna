
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheckCircle, faSquarePlus
} from "@fortawesome/free-regular-svg-icons";
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { populateProjectsByUser } from '../store/project';
import ColorPicker from './ColorPicker';


const NavBar = ({ projects }) => {
  const dispatch = useDispatch
  const user = useSelector(state => state.session.user?.id)



  return (
    <nav className='black-navbar'>
      <div className='black-nav-top'>
        <div className='navbar-asauna-logo'>
              <p className='signup-logo-text'>aSauna</p>
        </div>
      </div>
      <div className='black-nav-links'>
        <div className='navbar-link'>
        <FontAwesomeIcon className='house-icon' icon={faCheckCircle}></FontAwesomeIcon>
        <NavLink to={'/'} className='navbar-link-home'>Home</NavLink>
        </div>
        <div className='navbar-link'>
          <FontAwesomeIcon className='squareplus-icon' icon={faSquarePlus} />
          <NavLink to={'/new/project'} className='navbar-link-home'>Create Project</NavLink>
        </div>
      </div>
      <ul className='navbar-project-list'>
        <p className='navbar-project-header'>Projects</p>
        {projects && projects.map(project => (
          <NavLink to={`/my_projects/${project.id}`} className="navbar-project-list">
            {project.color &&
            <li className={`project-list-icon-${project.color}`}>{project.name}</li>
            }
            {project.color === null &&
              <li className={`project-list-icon-${ColorPicker()}`}>{project.name}</li>
            }
          </NavLink>
        ))}
      </ul>
      <div className='plug-myself'>
        <a href='https://www.linkedin.com/in/dane-becker-780571230/' className='linkedin-plug'>
          <img src='https://www.kinesisinc.com/wp-content/uploads/2020/04/linkedin-101-hero@2x.png' className='linkedin-img' />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
