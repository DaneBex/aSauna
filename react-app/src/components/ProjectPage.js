import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faCircleCheck as farCircleCheck, faCaretSquareDown, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion, faPlusSquare, faCircle as farCircle
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteProject, populateProjectsByUser, updateProject, updateProjectStatus } from "../store/project";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import './ProjectPage.css'
import { faL } from "@fortawesome/free-solid-svg-icons";
import EditProjectModal from "./EditProjectModal";
import ProfileOptionModal from "./ProfileOptionModal";
import { logout } from "../store/session";
import { createTask, populateTasksByProject, updateTask } from "../store/task";


const ProjectPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
        dispatch(populateTasksByProject(parseInt(projectId)))
    }, [])


    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)
    const tasksObj = useSelector(state => state?.task)
    const tasks = Object.values(tasksObj)
    console.log(tasks)
    const thisPJ = projects.find(project => project.id === parseInt(projectId))

    const [pjDetails, setPjDetails] = useState(false)
    const [pjColors, setPjColors] = useState(false)
    const [pjSettings, setPjSettings] = useState(false)
    const [statusSetting, setStatusSetting] = useState(false)
    const [profOpen, setProfOpen] = useState(false)
    const [taskPriority, setTaskPriority] = useState(false)
    const [task, setTask] = useState(false)
    const [taskStatus, setTaskStatus] = useState(false)
    const [date, setDate] = useState(false)



    console.log(thisPJ)

    const closePJOptions = () => {
        if (pjDetails) setPjDetails(false)
        else setPjDetails(true)
    }

    const closePjColors = () => {
        if (pjColors) setPjColors(false)
        else setPjColors(true)
    }

    const closePriority = () => {
        if (taskPriority) setTaskPriority(false)
        else setTaskPriority(true)
    }

    const closeStatus = (e) => {
        // e.stopPropogation()
        if (statusSetting) setStatusSetting(false)
        else setStatusSetting(true)
    }

    const closeTaskStatus = () => {
        if (taskStatus) setTaskStatus(false)
        else setTaskStatus(true)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    const closeProf = () => {
        if (profOpen) setProfOpen(false)
        else setProfOpen(true)
    }

    const removeProject = (id) => {
        dispatch(deleteProject(id))
        return history.push('/')
    }

    const updatePjColor = (e) => {
        setPjColors(false)
        dispatch(updateProject(thisPJ?.id, e.target.id))
    }

    const updatePjStatus = (str) => {
        setStatusSetting(false)
        dispatch(updateProject(thisPJ?.id, str))
    }

    const updateTaskPriority = (id, str) => {
        setTaskPriority(false)
        dispatch(updateTask(id, str))
        dispatch(populateProjectsByUser(user.id))
    }

    const submitDateHandler = (e, id) => {
        console.log(e.target.value)
        dispatch(updateTask(id, { "due_date": e.target.value }))
        dispatch(populateTasksByProject(thisPJ.id))
        dispatch(populateProjectsByUser(user.id))
    }

    const createTaskHandler = () => {
        let vals = {
            "owner_id": user.id,
            "project_id": thisPJ.id,
            "task": task
        }
        dispatch(createTask(vals))
        dispatch(populateProjectsByUser(user.id))
    }

    const updateTaskNameHandler = (id, e) => {
        console.log(e.target.value)
        dispatch(updateTask(id, {"new_name": e.target.value}))
        dispatch(populateProjectsByUser(user.id))
    }


    return (
        <div className="project-page-whole-page">
            <NavBar projects={projects} />
            <div className="main-project-page">
                <div className="project-top-of-home">
                    <div className="project-page-top-left">
                        <div className="project-top-left-top">
                            {thisPJ && thisPJ.color &&
                                <FontAwesomeIcon onClick={closePjColors} className={`rectangle-list-icon-${thisPJ.color}`} icon={faRectangleList} />
                            }
                            {thisPJ && thisPJ.color === null &&
                                <FontAwesomeIcon onClick={closePjColors} className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                            }
                            {pjColors &&
                                <div className="color-selection">
                                    <div className="color-picker-list">
                                        <div onClick={updatePjColor} id="blue-picker" />
                                        <div onClick={updatePjColor} id="pink-picker" />
                                        <div onClick={updatePjColor} id="green-picker" />
                                        <div onClick={updatePjColor} id="orange-picker" />
                                        <div onClick={updatePjColor} id="red-picker" />
                                    </div>
                                    <div className="color-picker-list">
                                        <div onClick={updatePjColor} id="purple-picker" />
                                        <div onClick={updatePjColor} id="cyan-picker" />
                                        <div onClick={updatePjColor} id="black-picker" />
                                        <div onClick={updatePjColor} id="magenta-picker" />
                                        <div onClick={updatePjColor} id="yellow-picker" />
                                    </div>
                                </div>
                            }
                            {thisPJ && thisPJ.name.length > 11 &&
                                <h1 className="project-page-name">{thisPJ.name.slice(0, 11) + '...'}</h1>
                            }
                            {thisPJ && thisPJ.name.length < 12 &&
                                <h1 className="project-page-name">{thisPJ.name}</h1>
                            }
                            <FontAwesomeIcon onClick={closePJOptions} className="down-project-option" icon={faCircleDown} />
                            {pjDetails &&
                                <div className="project-options-box">

                                    <div className="delete-project">
                                        <p onClick={() => removeProject(projectId)}>Delete Project</p>
                                    </div>
                                </div>
                            }
                            <EditProjectModal project={thisPJ} />
                            <div onClick={(e) => closeStatus()} className="set-status-div">
                                {thisPJ?.status === null &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle" icon={farCircle} />
                                        <p className="status-text">Set status</p>
                                    </>
                                }
                                {thisPJ?.status === 1 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-green" icon={fasCircle} />
                                        <p className="status-text">On track</p>
                                    </>
                                }
                                {thisPJ?.status === 2 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-yellow" icon={fasCircle} />
                                        <p className="status-text">At risk</p>
                                    </>
                                }
                                {thisPJ?.status === 3 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-red" icon={fasCircle} />
                                        <p className="status-text">Off track</p>
                                    </>
                                }
                                {thisPJ?.status === 4 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-blue" icon={fasCircle} />
                                        <p className="status-text">On hold</p>
                                    </>
                                }
                                {thisPJ?.status === 5 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-check" icon={fasCircleCheck} />
                                        <p className="status-text">Complete!</p>
                                    </>
                                }
                                {statusSetting &&
                                    <div className="set-status-box">
                                        <div className="top-of-status-box">Update status</div>
                                        <div className="all-status-options">
                                            <div onClick={() => updatePjStatus('green')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-green" icon={fasCircle} />
                                                <p className="status-text">On track</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('yellow')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-yellow" icon={fasCircle} />
                                                <p className="status-text">At risk</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('red')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-red" icon={fasCircle} />
                                                <p className="status-text">Off track</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('blue')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-blue" icon={fasCircle} />
                                                <p className="status-text">On hold</p>
                                            </div>
                                        </div>
                                        <div onClick={() => updatePjStatus('complete')} className="status-option">
                                            <FontAwesomeIcon className="set-status-check" icon={fasCircleCheck} />
                                            <p className="status-text-complete">Complete</p>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                        <div className="project-top-left-bottom">
                            <p className="project-view-options">Overview</p>
                            <p className="project-view-options">List</p>
                        </div>
                    </div>
                    {user.profile_pic &&
                        <img onClick={closeProf} className="user-prof-pic" src={user.profile_pic} />
                    }
                    {user.profile_pic === null &&
                        <img onClick={closeProf} className="user-prof-pic" src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' />
                    }
                    {profOpen &&
                        <div className="profile-options-project-page">
                            <ProfileOptionModal user={user} />
                            <p onClick={logoutHandler} className="profile-option">Log Out</p>

                        </div>
                    }
                </div>
                <div className="lower-project-page">
                    <div className="add-task-button-div-projects">
                        <div className="add-task-button">
                            <FontAwesomeIcon className="add-task-icon" icon={faSquarePlus} />
                            <p>Add task</p>
                        </div>
                        <div className="add-section-button">
                            <FontAwesomeIcon className="add-section-icon" icon={faCaretSquareDown} />
                        </div>
                    </div>
                    <div className="project-task-table-heads">
                        <div className="task-name-header">
                            <p className="task-header-text">Task name</p>
                        </div>
                        <div className="task-due-date-header">
                            <p className="task-header-text">Due date</p>
                        </div>
                        <div className="task-priority-header">
                            <p className="task-header-text">Priority</p>
                        </div>
                        <div className="task-status-header">
                            <p className="task-header-text">Status</p>

                        </div>
                    </div>
                    {thisPJ?.tasks.length > 0 && thisPJ.tasks.map(task => (
                        <div className="project-task-active">
                            <div className="task-name">
                                <FontAwesomeIcon className="task-check-icon" icon={farCircleCheck} />
                                <input onBlur={(e) => updateTaskNameHandler(task.id, e)} defaultValue={task.name} className="task-name-input" />
                            </div>
                            <div className="task-duedate">
                                {task.due_date &&
                                    <div className="duedate-data-in">
                                        <p className="task-duedate-data">{task?.due_date.slice(0, 16)}</p>
                                        <input onChange={(e) => submitDateHandler(e, task.id)} className="task-duedate-input" type="date" />
                                    </div>
                                }
                                {task.due_date === null &&
                                    <input onChange={(e) => submitDateHandler(e, task.id)} className="task-duedate-input" type="date" />
                                }
                            </div>
                            <div onClick={() => closePriority()} className="enter-task-priority">
                                {task.priority === null || task.priority === 0 &&
                                    <p>-</p>
                                }
                                {task.priority === 1 &&
                                    <p className="priority-option-low">Low</p>
                                }
                                {task.priority === 2 &&
                                    <p className="priority-option-medium">Medium</p>
                                }
                                {task.priority === 3 &&
                                    <p className="priority-option-high">High</p>
                                }
                                {taskPriority &&
                                    <div className="priority-option-box">
                                        <div onClick={() => updateTaskPriority(task.id, 'none')} className="priority-option">
                                            <p className="priority-option-none">None</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'low')} className="priority-option">
                                            <p className="priority-option-low">Low</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'medium')} className="priority-option">
                                            <p className="priority-option-medium">Medium</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'high')} className="priority-option">
                                            <p className="priority-option-high">High</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div onClick={() => closeTaskStatus()} className="enter-task-status">
                                {task.status === null || task.status === 0 &&
                                    <p>-</p>
                                }
                                {task.status === 1 &&
                                    <p className="status-option-ontrack">On track</p>
                                }
                                {task.status === 2 &&
                                    <p className="status-option-atrisk">At risk</p>
                                }
                                {task.status === 3 &&
                                    <p className="status-option-offtrack">Off track</p>
                                }
                                {taskStatus &&
                                    <div className="priority-option-box">
                                        <div onClick={() => updateTaskPriority(task.id, 'status-none')} className="priority-option">
                                            <p className="status-option-none">None</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'on-track')} className="priority-option">
                                            <p className="status-option-ontrack">On track</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'at-risk')} className="priority-option">
                                            <p className="status-option-atrisk">At risk</p>
                                        </div>
                                        <div onClick={() => updateTaskPriority(task.id, 'off-track')} className="priority-option">
                                            <p className="status-option-offtrack">Off track</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                    }
                    <div className="write-a-task">
                        <div className="enter-task-name">
                            <FontAwesomeIcon className="task-check-icon" icon={farCircleCheck} />
                            <input value={task} onChange={(e) => setTask(e.target.value)} onBlur={() => createTaskHandler()} className='enter-task-input' placeholder="Click here to add a task...">
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
