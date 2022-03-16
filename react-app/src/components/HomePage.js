import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout } from "../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faRectangleList
} from "@fortawesome/free-regular-svg-icons";
import './HomePage.css'
import { useDispatch, useSelector } from "react-redux";
import ProfileOptionModal from "./ProfileOptionModal";
import { populateProjectsByUser } from "../store/project";
import ColorPicker from "./ColorPicker";


const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
    }, [])

    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)

    console.log(projects)

    const [profOpen, setProfOpen] = useState(false)
    const [profSetting, setProfSetting] = useState(false)

    const closeProf = () => {
        if (profOpen) setProfOpen(false)
        else setProfOpen(true)
    }

    const closeSetting = () => {
        if (profSetting) setProfSetting(false)
        else setProfSetting(true)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    const d = new Date
    const date = d.toString()

    if (!user) return <Redirect to="/login" />;

    let viewProfSetting = <ProfileOptionModal user={user} />

    return (
        <div className="homepage-entire-page">
            <NavBar projects={projects} />
            <div className="main-homepage">
                <div className="top-of-home">
                    <h1 className="home-h1">Home</h1>
                    <div className="user-prof-box">
                        {user.profile_pic &&
                            <img onClick={closeProf} className="user-prof-pic" src={user.profile_pic} />
                        }
                        {user.profile_pic === null &&
                            <img onClick={closeProf} className="user-prof-pic" src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' />
                        }
                        {profOpen &&
                            <div className="profile-options">
                                <p onClick={closeSetting} className="profile-option">Edit Profile</p>
                                <p onClick={logoutHandler} className="profile-option">Log Out</p>

                            </div>
                        }

                    </div>
                    {profSetting && viewProfSetting}
                </div>
                <div className="homepage-content">
                    <h5 className="homepage-date">
                        {date.slice(0, 10)}
                    </h5>
                    <h2 className="homepage-goodmorning">
                        Hello, {user.username}
                    </h2>
                    <div className="homepage-project-box">
                        <div className="homepage-project-box-top">
                            <h4 className="homepage-project-box-header">Projects</h4>
                        </div>
                        <div className="homepage-project-list">
                            <NavLink to={'/new/project'} className="project-list">
                                <FontAwesomeIcon className="project-list-icon-plus" icon={faSquarePlus} />
                                <p className="project-list-name">Create Project</p>
                            </NavLink>
                        </div>
                        {projects && projects.map(project => (
                            <div className="homepage-project-list">
                                <NavLink to={`/my_projects/${project.id}`} className="project-list">
                                    {project.color &&
                                    <FontAwesomeIcon className={`rectangle-list-icon-${project.color}`} icon={faRectangleList} />
                                    }
                                    {project.color === null &&
                                    <FontAwesomeIcon className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                                    }
                                    <p className="project-list-name">{project.name}</p>
                                </NavLink>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage
