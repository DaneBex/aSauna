import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCircleXmark,
    faCircleCheck,
    faCalendar
} from "@fortawesome/free-regular-svg-icons";
import './NewProject.css'
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { createProject, populateProjectsByUser } from "../store/project";
import { useDispatch, useSelector } from "react-redux";

const NewProject = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleGetProjects = () => {
        dispatch(populateProjectsByUser(user.id))
    }

    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)

    console.log(projects)

    let submitButton;

    const [projectName, setProjectName] = useState('')
    const [projectDetails, setProjectDetails] = useState('')

    const updatePname = (e) => {
        setProjectName(e.target.value)
    }

    const updatePdetails = (e) => {
        setProjectDetails(e.target.value)
    }

    const createProjectHandler = async (e) => {
         e.preventDefault()

        let newPJ = await dispatch(createProject({
            owner_id: user.id,
            name: projectName,
            details: projectDetails
        }))

        console.log(newPJ)
        if (newPJ) {
            history.push(`/my_projects/${newPJ.id}`)
        } else console.log('not working')

    }

    if (projectName && projectDetails) {
        submitButton = <button type="submit" className="new-project-submit">Continue</button>
    } else {
        submitButton = <p className="new-project-submit-nothing">Continue</p>
    }

    return (
        <div className="new-project-page">
            <div className="new-project-header">
                <NavLink to={'/'}>
                <FontAwesomeIcon  className='x-icon' icon={faCircleXmark} />
                </NavLink>
            </div>
            <div className="new-project-details">
                <div className="project-details-header">
                    <h2 className="project-details-h2">New Project</h2>
                </div>
                <form onSubmit={createProjectHandler} id="new-project-form">
                    <div className="new-project-input-label">
                        <label className="new-project-label">Project name</label>
                        <input onClick={handleGetProjects} required value={projectName} onChange={updatePname} className='new-project-input' />
                    </div>
                    <div className="new-project-input-label">
                        <label className="new-project-label">Project Details</label>
                        <textarea required value={projectDetails} onChange={updatePdetails} className='new-project-textarea' />
                    </div>
                    {submitButton}
                </form>
            </div>
            <div className="new-project-example">
                <div className="new-project-example-top">
                    <div className="grey-square"></div>
                    <div className="new-project-name-options">
                        <h5 className="new-project-example-name">{projectName}</h5>
                        <div className="new-project-example-options">
                            <p className="new-project-example-option">
                                Overview
                            </p>
                            <p className="new-project-example-option-blue">
                                List
                            </p>
                        </div>
                    </div>
                </div>
                <div className="new-project-example-content">
                    <div className="to-do">
                        <h5 className="to-do-title">To do</h5>
                        <div className="example-task">
                            <div className="example-task-name">
                                <FontAwesomeIcon className="task-check-icon" icon={faCircleCheck} />
                                <div className="task-example-grey-line"></div>
                            </div>
                            <div className="example-task-asignee">
                                <img className="example-task-asignee-pic" src="https://media.istockphoto.com/photos/smiling-black-man-in-suit-posing-on-studio-background-picture-id1201144328?k=20&m=1201144328&s=612x612&w=0&h=U2DJlDOnhJNvQziVvorKPIlqygqqpNL1s_rxqlLUhDo=" />
                            </div>
                            <div className="example-task-calendar">
                                <FontAwesomeIcon className="task-calendar-icon" icon={faCalendar} />
                                <div className="task-example-grey-line-calendar"></div>
                            </div>
                            <div className="task-example-green-line"></div>
                            <div className="task-example-purple-line"></div>
                        </div>
                        <div className="example-task">
                            <div className="example-task-name">
                                <FontAwesomeIcon className="task-check-icon" icon={faCircleCheck} />
                                <div className="task-example-grey-line-two"></div>
                            </div>
                            <div className="example-task-asignee">
                                <img className="example-task-asignee-pic" src="https://static.showit.co/1600/KY4rr175TueWGUoP7Xv_XA/128788/professional_branding_mens_portraits_frisco_texas_korey_howell_photography_group_corporate.jpg" />
                            </div>
                            <div className="example-task-calendar">
                                <FontAwesomeIcon className="task-calendar-icon" icon={faCalendar} />
                                <div className="task-example-grey-line-calendar"></div>
                            </div>
                            <div className="task-example-pink-line"></div>
                            <div className="task-example-blue-line"></div>
                        </div>
                    </div>
                    <div className="to-do">
                        <h5 className="to-do-title">In Progress</h5>
                        <div className="example-task">
                            <div className="example-task-name">
                                <FontAwesomeIcon className="task-check-icon" icon={faCircleCheck} />
                                <div className="task-example-grey-line"></div>
                            </div>
                            <div className="example-task-asignee">
                                <img className="example-task-asignee-pic" src="https://www.minneapolisheadshots.com/gallery/main/professional-woman1.jpg" />
                            </div>
                            <div className="example-task-calendar">
                                <FontAwesomeIcon className="task-calendar-icon" icon={faCalendar} />
                                <div className="task-example-grey-line-calendar"></div>
                            </div>
                            <div className="task-example-cyan-line"></div>
                            <div className="task-example-orange-line"></div>
                        </div>
                    </div>
                    <div className="to-do">
                        <h5 className="to-do-title">Complete</h5>
                        <div className="example-task">
                            <div className="example-task-name">
                                <FontAwesomeIcon className="task-check-icon-green" icon={faCircleCheck} />
                                <div className="task-example-grey-line"></div>
                            </div>
                            <div className="example-task-asignee">
                                <img className="example-task-asignee-pic" src="https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh" />
                            </div>
                            <div className="example-task-calendar">
                                <FontAwesomeIcon className="task-calendar-icon" icon={faCalendar} />
                                <div className="task-example-grey-line-calendar"></div>
                            </div>
                            <div className="task-example-green-line"></div>
                            <div className="task-example-purple-line"></div>
                        </div>
                        <div className="example-task">
                            <div className="example-task-name">
                                <FontAwesomeIcon className="task-check-icon-green" icon={faCircleCheck} />
                                <div className="task-example-grey-line-two"></div>
                            </div>
                            <div className="example-task-asignee">
                                <img className="example-task-asignee-pic" src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg?format=1000w" />
                            </div>
                            <div className="example-task-calendar">
                                <FontAwesomeIcon className="task-calendar-icon" icon={faCalendar} />
                                <div className="task-example-grey-line-calendar"></div>
                            </div>
                            <div className="task-example-pink-line"></div>
                            <div className="task-example-blue-line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewProject
