import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import ProjectTop from "./ProjectTop";
import { useParams } from "react-router-dom";
import { populateProjectsByUser, updateProject } from "../store/project";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faCircleCheck as farCircleCheck, faCalendarDays, faCaretSquareDown, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion, faPlusSquare, faCircle as farCircle
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faEllipsis, faCheck, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import './Overview.css'

const Overview = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const { projectId } = useParams()

    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
    }, [])

    const [statusDrop, setStatusDrop] = useState(false)

    const projects = useSelector(state => Object.values(state.project))
    const thisPJ = projects.find(project => project.id === parseInt(projectId))
    console.log(thisPJ)
    console.log(projects, projectId)

    const closeStatus = () => {
        if (statusDrop) setStatusDrop(false)
        else setStatusDrop(true)
    }

    const updatePjStatus = (str) => {
        setStatusDrop(false)
        dispatch(updateProject(thisPJ?.id, str))
    }

    const updatePjDate = (date) => {
        dispatch(updateProject(thisPJ?.id, { "due_date": date }))
    }

    const updatePjDetails = (details) => {
        dispatch(updateProject(thisPJ?.id, { "details": details }))
    }

    return (
        <div className="project-page-whole-page">
            <NavBar projects={projects} />
            <div className="main-project-page">
                <ProjectTop thisPJ={thisPJ} />
                <div className="main-project-overview">
                    <div className="project-overview-left">
                        <div className="project-overview-details">
                            <h4 className="project-overview-details-header">Project details</h4>
                            <textarea placeholder="Set the tone for how you plan to accomplish this project. Add details, reminders, and other important information." defaultValue={thisPJ?.details} onBlur={(e) => updatePjDetails(e.target.value)} className="project-overview-details-textarea" />
                        </div>
                    </div>
                    <div className="project-overview-right">
                        <div className="overview-right-status">
                            <h4 className="overview-whats-the-status">
                                What's the status?
                            </h4>
                            <div className="overview-status-buttons">
                                <div onClick={() => updatePjStatus('green')} className="overview-ontrack-button-ontrack">
                                    <FontAwesomeIcon className="set-status-circle-green" icon={fasCircle} />
                                    <p className="overview-status-text">On track</p>
                                </div>
                                <div onClick={() => updatePjStatus('yellow')} className="overview-ontrack-button-atrisk">
                                    <FontAwesomeIcon className="set-status-circle-yellow" icon={fasCircle} />
                                    <p className="overview-status-text">At risk</p>
                                </div>
                                <div onClick={() => updatePjStatus('red')} className="overview-ontrack-button-offtrack">
                                    <FontAwesomeIcon className="set-status-circle-red" icon={fasCircle} />
                                    <p className="overview-status-text">Off track</p>
                                </div>
                                <div className="ellipsis-dropdown-status">
                                    <FontAwesomeIcon onClick={closeStatus} icon={faEllipsis} className={'overview-status-complete-dropdown'} />
                                    {statusDrop &&
                                        <div onClick={() => updatePjStatus('complete')} className="complete-project-status-box">
                                            <p className="complete-project-status-text">Complete Project</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="overview-duedate">
                            <p>Due Date</p>
                            <FontAwesomeIcon className="overview-duedate-icon" icon={faCalendarDays} />
                            <div className="overview-duedate-data">
                                {Date.parse(thisPJ?.due_date) > Date.parse(Date()) &&
                                    <>
                                        <p className="overview-duedate-data-date-future">{thisPJ?.due_date.slice(0, 16)}</p>
                                        <input onChange={(e) => updatePjDate(e.target.value)} type="date" className="overview-duedate-data-input"></input>
                                    </>
                                }
                                {Date.parse(thisPJ.due_date) < Date.parse(Date()) &&
                                    <>
                                        <p className="overview-duedate-data-date-past">{thisPJ?.due_date.slice(0, 16)}</p>
                                        <input onChange={(e) => updatePjDate(e.target.value)} type="date" className="overview-duedate-data-input"></input>
                                    </>
                                }
                                {thisPJ.due_date === null &&
                                    <>
                                        <p className="overview-duedate-data-date">No due date</p>
                                        <input onChange={(e) => updatePjDate(e.target.value)} type="date" className="overview-duedate-data-input" />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
