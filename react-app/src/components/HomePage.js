import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout, updateUser } from "../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faRectangleList
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faEllipsis, faCheck, faCircleCheck as fasCircleCheck, faX } from "@fortawesome/free-solid-svg-icons"
import './HomePage.css'
import { useDispatch, useSelector } from "react-redux";
import ProfileOptionModal from "./ProfileOptionModal";
import { populateProjectsByUser } from "../store/project";
import ColorPicker from "./ColorPicker";
import { populateTasksByProject } from "../store/task";


const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    console.log(user)


    useEffect(() => {

        dispatch(populateProjectsByUser())
    }, [])

    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)
    const tasks = useSelector(state => Object.values(state.task))

    const completedTasks = tasks.filter(task => {
        return task.status === 4
    })

    const [customize, setCustomize] = useState(false)

    const lateProjects = projects.filter(project => {
        return (Date.parse(Date()) > Date.parse(project.due_date) && project.status !== 5)
    })

    const completeProjects = projects.filter(project => {
        return project.status === 5
    })


    const [profOpen, setProfOpen] = useState(false)
    const [profSetting, setProfSetting] = useState(false)
    const [priorityBox, setPriorityBox] = useState(0)

    const closeProf = () => {
        if (profOpen) setProfOpen(false)
        else setProfOpen(true)
    }

    const closeCustomize = () => {
        if (customize) setCustomize(false)
        else setCustomize(true)
    }

    const closeSetting = () => {
        if (profSetting) setProfSetting(false)
        else setProfSetting(true)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    const changeUserBackground = (str) => {
        dispatch(updateUser(user.id, str))
    }

    console.log(profSetting)

    const d = new Date
    const date = d.toString()

    if (!user) return <Redirect to="/login" />;

    let viewProfSetting = <ProfileOptionModal user={user} />

    return (
        <div className="homepage-entire-page">
            {customize &&
                <div className="customize-page-div">
                    <div className="customize-page-header">
                        <h2>Customize Home</h2>
                        <FontAwesomeIcon onClick={() => closeCustomize()} className="close-customize-icon" icon={faX} />
                    </div>
                    <div className="color-picker-div">
                        <p className="customize-page-background-text">Background</p>
                        <div className="color-picker-colors-top">
                            <div onClick={() => changeUserBackground('maroon')} className="background-maroon" />
                            <div onClick={() => changeUserBackground('mustard')} className="background-mustard" />
                            <div onClick={() => changeUserBackground('lime')} className="background-lime" />
                            <div onClick={() => changeUserBackground('pine')} className="background-pine" />
                            <div onClick={() => changeUserBackground('ocean')} className="background-ocean" />
                            <div onClick={() => changeUserBackground('lightblue')} className="background-lightblue" />
                        </div>
                        <div className="color-picker-colors-bottom">
                            <div onClick={() => changeUserBackground('blue')} className="background-blue" />
                            <div onClick={() => changeUserBackground('lightpurple')} className="background-lightpurple" />
                            <div onClick={() => changeUserBackground('purple')} className="background-purple" />
                            <div onClick={() => changeUserBackground('pink')} className="background-pink" />
                            <div onClick={() => changeUserBackground('grey')} className="background-grey" />
                            <div onClick={() => changeUserBackground('white')} className="background-white" />
                        </div>
                    </div>
                </div>
            }
            <NavBar projects={projects} />
            {(user.background_color === null || user.background_color === 'mustard' || user.background_color === 'lime' || user.background_color === 'white' || user.background_color === 'grey' || user.background_color === 'pink' || user.background_color === 'lightblue' || user.background_color === 'ocean' || user.background_color === 'purple') &&
                <div className={`main-homepage-${user.background_color}`}>
                    <div className="top-of-home">
                        <h1 className="home-h1-dark">Home</h1>
                        <div className="user-prof-box">
                            {user.profile_pic &&
                                <img onClick={closeProf} className="user-prof-pic" src={user.profile_pic} />
                            }
                            {user.profile_pic === null &&
                                <img onClick={closeProf} className="user-prof-pic" src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' />
                            }
                            {profOpen &&
                                <div className="profile-options">
                                    <ProfileOptionModal user={user} />
                                    <p onClick={logoutHandler} className="profile-option">Log Out</p>

                                </div>
                            }

                        </div>
                    </div>
                    <div className="homepage-content">
                        <h5 className="homepage-date-dark">
                            {date.slice(0, 10)}
                        </h5>
                        <div className="homepage-greeting">
                            <h2 className="homepage-goodmorning-dark">
                                Hello, {user.username}
                            </h2>
                            {user.background_color !== 'white' &&
                                <div onClick={() => closeCustomize()} className="customize-button">
                                    <p className="customize-text-dark">Customize</p>
                                </div>
                            }
                            {user.background_color === 'white' &&
                                <div onClick={() => closeCustomize()} className="customize-button-white">
                                    <p className="customize-text-dark">Customize</p>
                                </div>
                            }

                        </div>
                        {user.background_color !== 'white' &&
                            <div className="homepage-circle-completions-dark">
                                <div className="homepage-completed-div">
                                    <p className="homepage-tasks-completed-text">{completedTasks.length} tasks completed</p>
                                </div>
                                <div className="homepage-completed-div">
                                    <p className="homepage-tasks-completed-text">{completeProjects.length} projects completed</p>
                                </div>
                            </div>
                        }
                        {user.background_color === 'white' &&
                            <div className="homepage-circle-completions-white">
                                <div className="homepage-completed-div">
                                    <p className="homepage-tasks-completed-text">{completedTasks.length} tasks completed</p>
                                </div>
                                <div className="homepage-completed-div">
                                    <p className="homepage-tasks-completed-text">{completeProjects.length} projects completed</p>
                                </div>
                            </div>
                        }
                        <div className="homepage-box-container">
                            <div className="homepage-project-box">
                                <div className="top-of-priority-box">
                                    <img src={user.profile_pic} className="priority-box-prof-pic" />
                                    <div className="priority-box-headers">
                                        <h3 className="my-priorities">My Priorities</h3>
                                        <div className="priority-box-options">
                                            {priorityBox === 0 &&
                                                <>
                                                    <p onClick={() => setPriorityBox(0)} className="priority-box-option-active">Overdue</p>
                                                    <p onClick={() => setPriorityBox(1)} className="priority-box-option">Completed</p>
                                                </>
                                            }
                                            {priorityBox === 1 &&
                                                <>
                                                    <p onClick={() => setPriorityBox(0)} className="priority-box-option">Overdue</p>
                                                    <p onClick={() => setPriorityBox(1)} className="priority-box-option-active">Completed</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {priorityBox === 0 &&
                                    <div className="priority-box-main">
                                        {lateProjects.length > 0 && lateProjects.map(project => (
                                            <div className="homepage-project-list">
                                                <NavLink to={`/my_projects/${project.id}`} className="project-list">
                                                    {project.color &&
                                                        <FontAwesomeIcon className={`rectangle-list-icon-${project.color}`} icon={faRectangleList} />
                                                    }
                                                    {project.color === null &&
                                                        <FontAwesomeIcon className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                                                    }
                                                    <p className="project-list-name">{project.name}</p>
                                                    <p className="priority-box-duedate-text">Due date: {project?.due_date.slice(0, 16)}</p>
                                                </NavLink>

                                            </div>
                                        ))}
                                        {lateProjects.length === 0 &&
                                            <div className="no-late-projects-div">
                                                <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/7efbfa8b351b071fff8d85a23b9901e8fb1c84c9/large-checkmark-with-three-colorful-bubbles.svg" className="no-late-projects" />
                                                <p>You don't have any overdue tasks. Nice!</p>
                                            </div>
                                        }
                                    </div>
                                }
                                {priorityBox === 1 &&
                                    <div className="priority-box-main">
                                        {completeProjects.length > 0 && completeProjects.map(project => (
                                            <div className="homepage-project-list">
                                                <NavLink to={`/my_projects/${project.id}`} className="project-list">
                                                    {project.color &&
                                                        <>
                                                            <FontAwesomeIcon className={`rectangle-list-icon-${project.color}`} icon={faRectangleList} />
                                                            <p className="project-list-name">{project.name}</p>
                                                        </>
                                                    }
                                                    {project.color === null &&
                                                        <>
                                                            <FontAwesomeIcon className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                                                            <p className="project-list-name">{project.name}</p>
                                                        </>
                                                    }
                                                </NavLink>
                                            </div>
                                        ))}
                                        {completeProjects.length === 0 &&
                                            <div className="no-late-projects-div">
                                                <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/50544816a11896f9695930a69c8899a7eda8a7ff/two-completed-tasks.svg" className="no-late-projects" />
                                                <p>Your completed projects will apear here, so you can reference them later.</p>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
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
            }
            {(user.background_color === 'maroon' || user.background_color === 'pine' || user.background_color === 'blue' || user.background_color === 'lightpurple' || user.background_color === 'purple') &&
                <div className={`main-homepage-${user.background_color}`}>
                    <div className="top-of-home">
                        <h1 className="home-h1-light">Home</h1>
                        <div className="user-prof-box">
                            {user.profile_pic &&
                                <img onClick={closeProf} className="user-prof-pic" src={user.profile_pic} />
                            }
                            {user.profile_pic === null &&
                                <img onClick={closeProf} className="user-prof-pic" src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' />
                            }
                            {profOpen &&
                                <div className="profile-options">
                                    <ProfileOptionModal user={user} />
                                    <p onClick={logoutHandler} className="profile-option">Log Out</p>

                                </div>
                            }

                        </div>
                    </div>
                    <div className="homepage-content">
                        <h5 className="homepage-date-light">
                            {date.slice(0, 10)}
                        </h5>
                        <div className="homepage-greeting">
                            <h2 className="homepage-goodmorning-light">
                                Hello, {user.username}
                            </h2>
                            <div onClick={() => closeCustomize()} className="customize-button">
                                <p className="customize-text-light">Customize</p>
                            </div>
                        </div>
                        <div className="homepage-circle-completions-light">
                            <div className="homepage-completed-div">
                                <p className="homepage-tasks-completed-text">{completedTasks.length} tasks completed</p>
                            </div>
                            <div className="homepage-completed-div">
                                <p className="homepage-tasks-completed-text">{completeProjects.length} projects completed</p>
                            </div>
                        </div>
                        <div className="homepage-box-container">
                            <div className="homepage-project-box">
                                <div className="top-of-priority-box">
                                    {user.profile_pic &&
                                    <img src={user.profile_pic} className="priority-box-prof-pic" />
                                    }
                                    {user.profile_pic === null &&
                                     <img src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' className="priority-box-prof-pic" />
                                    }
                                    <div className="priority-box-headers">
                                        <h3 className="my-priorities">My Priorities</h3>
                                        <div className="priority-box-options">
                                            {priorityBox === 0 &&
                                                <>
                                                    <p onClick={() => setPriorityBox(0)} className="priority-box-option-active">Overdue</p>
                                                    <p onClick={() => setPriorityBox(1)} className="priority-box-option">Completed</p>
                                                </>
                                            }
                                            {priorityBox === 1 &&
                                                <>
                                                    <p onClick={() => setPriorityBox(0)} className="priority-box-option">Overdue</p>
                                                    <p onClick={() => setPriorityBox(1)} className="priority-box-option-active">Completed</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {priorityBox === 0 &&
                                    <div className="priority-box-main">
                                        {lateProjects.length > 0 && lateProjects.map(project => (
                                            <div className="homepage-project-list">
                                                <NavLink to={`/my_projects/${project.id}`} className="project-list">
                                                    {project.color &&
                                                        <FontAwesomeIcon className={`rectangle-list-icon-${project.color}`} icon={faRectangleList} />
                                                    }
                                                    {project.color === null &&
                                                        <FontAwesomeIcon className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                                                    }
                                                    <p className="project-list-name">{project.name}</p>
                                                    <p className="priority-box-duedate-text">Due date: {project?.due_date.slice(0, 16)}</p>
                                                </NavLink>

                                            </div>
                                        ))}
                                        {lateProjects.length === 0 &&
                                            <div className="no-late-projects-div">
                                                <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/7efbfa8b351b071fff8d85a23b9901e8fb1c84c9/large-checkmark-with-three-colorful-bubbles.svg" className="no-late-projects" />
                                                <p>You don't have any overdue tasks. Nice!</p>
                                            </div>
                                        }
                                    </div>
                                }
                                {priorityBox === 1 &&
                                    <div className="priority-box-main">
                                        {completeProjects.length > 0 && completeProjects.map(project => (
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
                                        {completeProjects.length === 0 &&
                                            <div className="no-late-projects-div">
                                                <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/50544816a11896f9695930a69c8899a7eda8a7ff/two-completed-tasks.svg" className="no-late-projects" />
                                                <p>Your completed projects will apear here, so you can reference them later.</p>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
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
            }
        </div>

    )
}

export default HomePage
