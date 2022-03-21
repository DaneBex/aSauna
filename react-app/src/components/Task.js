import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faTrashCan, faCircleCheck as farCircleCheck, faCaretSquareDown, faComment, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion, faPlusSquare, faCircle as farCircle
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faCheck, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, populateTasksByProject } from "../store/task";
import { populateProjectsByUser } from "../store/project";
import TaskDetails from "./TaskDetails";


const Task = ({ task, thisPJ }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session?.user)
    const projects = useSelector(state => Object.values(state.project))
    const tasks = useSelector(state => Object.values(state.task))
    let thisPriority;
    let thisStatus;

    const [taskPriority, setTaskPriority] = useState(0)
    const [desiredPriority, setDesiredPriority] = useState('')
    const [taskStatus, setTaskStatus] = useState(false)

    const [showTaskDetails, setShowTaskDetails] = useState(false)

    // useEffect(() => {
    //     dispatch(populateProjectsByUser(user.id))
    //     dispatch(populateTasksByProject(thisPJ.id))
    // }, [dispatch])

    const thisTask = thisPJ.tasks.find(task => task.id === task.id)

    console.log(tasks)

    const closeTaskDetails = (id) => {
        if (showTaskDetails) setShowTaskDetails(false)
        else setShowTaskDetails(id)
    }

    const closePriority = (id) => {
        if (taskPriority) setTaskPriority(0)
        else setTaskPriority(id)
    }

    const closeStatusBox = (id) => {
        if (taskStatus) setTaskStatus(0)
        else setTaskStatus(id)
    }

    const updateTaskPriority = () => {
        console.log('TaskPriority:', taskPriority, 'DesiredPriority:', desiredPriority)
        dispatch(updateTask(task.id, thisPriority))
        setTaskPriority(0)
        dispatch(populateProjectsByUser(user.id))
        // window.location.reload(false)
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTask(task.id))
        dispatch(populateProjectsByUser())
        dispatch(populateTasksByProject(thisPJ.id))
    }

    const updateTaskStatus = () => {
        dispatch(updateTask(task.id, thisStatus))
        setTaskStatus(0)
        dispatch(populateProjectsByUser(user.id))
    }

    const updateTaskNameHandler = (id, e) => {
        console.log(e.target.value)
        if (e.target.value === '') {
            dispatch(deleteTask(id))
            dispatch(populateProjectsByUser(user.id))
        } else {
            dispatch(updateTask(id, { "new_name": e.target.value }))
            dispatch(populateProjectsByUser(user.id))
        }
    }

    const submitDateHandler = (e, id) => {
        // console.log(e.target.value)
        dispatch(updateTask(id, { "due_date": e.target.value }))
        // dispatch(populateTasksByProject(thisPJ.id))
        dispatch(populateProjectsByUser(user.id))
    }



    return (
        <div className="project-task-active">
            <div onClick={() => closeTaskDetails(task.id)} className="task-name">
                {task.status === null &&
                    <FontAwesomeIcon onClick={() => {
                        thisStatus = 'complete'
                        updateTaskStatus()
                    }} className="task-check-icon" icon={farCircleCheck} />
                }
                {task.status < 4 &&
                    <FontAwesomeIcon onClick={() => {
                        thisStatus = 'complete'
                        updateTaskStatus()
                    }} className="task-check-icon" icon={farCircleCheck} />
                }
                {task.status === 4 &&
                    <FontAwesomeIcon onClick={() => {
                        thisStatus = 'status-none'
                        updateTaskStatus()
                    }} className="task-check-icon-complete" icon={fasCircleCheck} />
                }
                <input onBlur={(e) => updateTaskNameHandler(task.id, e)} defaultValue={task.name} className="task-name-input" />
                {task.comments.length > 0 &&
                    <div className="task-comments-num">
                        <p className="task-comments-length">{task.comments.length}</p>
                        <FontAwesomeIcon icon={faComment} className="task-comment-icon" />
                    </div>
                }
                <FontAwesomeIcon onClick={() => deleteTaskHandler()} className="delete-task-icon" icon={faTrashCan} />
            </div>
            {showTaskDetails === task.id &&
                <TaskDetails task={task} project={thisPJ} closeTaskDetails={closeTaskDetails} updateTaskStatus={updateTaskStatus} />
            }
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
            <div onClick={() => {
                closePriority(task.id)
                // console.log('Task Id:', task.id, 'taskPriority:', taskPriority)
            }} className="enter-task-priority">
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
                {taskPriority === task.id &&
                    <div className="priority-option-box">
                        <div onClick={(e) => {
                            thisPriority = 'none'
                            // console.log('taskPriority:', taskPriority, 'desiredPriority:', desiredPriority)
                            updateTaskPriority(e)
                        }
                        } className={`priority-option`}>
                            <p className={`priority-option-none`}>None</p>
                        </div>
                        <div onClick={() => {
                            thisPriority = 'low'
                            console.log(desiredPriority)
                            updateTaskPriority()
                        }} className="priority-option">
                            <p className="priority-option-low">Low</p>
                        </div>
                        <div onClick={() => {
                            thisPriority = 'medium'
                            console.log(desiredPriority)
                            updateTaskPriority()
                        }} className="priority-option">
                            <p className="priority-option-medium">Medium</p>
                        </div>
                        <div onClick={() => {
                            thisPriority = 'high'
                            console.log(task.id)
                            updateTaskPriority()
                        }} className="priority-option">
                            <p className="priority-option-high">High</p>
                        </div>
                    </div>
                }
            </div>
            <div onClick={() => closeStatusBox(task.id)} className="enter-task-status">
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
                {taskStatus === task.id &&
                    <div className="priority-option-box">
                        <div onClick={() => {
                            thisStatus = 'status-none'
                            updateTaskStatus()
                        }} className="priority-option">
                            <p className="status-option-none">None</p>
                        </div>
                        <div onClick={() => {
                            thisStatus = 'on-track'
                            updateTaskStatus()
                        }} className="priority-option">
                            <p className="status-option-ontrack">On track</p>
                        </div>
                        <div onClick={() => {
                            thisStatus = 'at-risk'
                            updateTaskStatus()
                        }} className="priority-option">
                            <p className="status-option-atrisk">At risk</p>
                        </div>
                        <div onClick={() => {
                            thisStatus = 'off-track'
                            updateTaskStatus()
                        }} className="priority-option">
                            <p className="status-option-offtrack">Off track</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Task
