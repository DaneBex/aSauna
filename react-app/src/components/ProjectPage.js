import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faCircleCheck as farCircleCheck, faCaretSquareDown, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion, faPlusSquare, faCircle as farCircle
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faCheck, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteProject, populateProjectsByUser, updateProject, updateProjectStatus } from "../store/project";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import './ProjectPage.css'
import { faL } from "@fortawesome/free-solid-svg-icons";
import EditProjectModal from "./EditProjectModal";
import ProfileOptionModal from "./ProfileOptionModal";
import { logout } from "../store/session";
import { createTask, deleteTask, populateTasksByProject, updateTask } from "../store/task";
import Task from "./Task";
import ProjectTop from "./ProjectTop";


const ProjectPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const { projectId } = useParams()

    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
        dispatch(populateTasksByProject(parseInt(projectId)))
    }, [])


    const projects = useSelector(state => Object.values(state.project))
    const tasks = useSelector(state => Object.values(state.task).filter(task => {
        return task.project_id === parseInt(projectId)
    }))
    const thisPJ = projects.find(project => project.id === parseInt(projectId))


    const [task, setTask] = useState('')



    const createTaskHandler = () => {
        if (task) {
            setTask('')
            let vals = {
                "owner_id": user.id,
                "project_id": thisPJ.id,
                "task": task
            }
            dispatch(createTask(vals))
            dispatch(populateTasksByProject(thisPJ.id))
            dispatch(populateProjectsByUser(user.id))
        }
    }

    return (
        <div className="project-page-whole-page">
            <NavBar projects={projects} />
            <div className="main-project-page">
                <ProjectTop thisPJ={thisPJ} />
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
                        <Task task={task} thisPJ={thisPJ} />
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
