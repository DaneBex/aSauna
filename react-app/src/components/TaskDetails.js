import React, { useEffect, useState } from "react";
import { faCircle as fasCircle, faCheck, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, populateTasksByProject } from "../store/task";
import { populateProjectsByUser } from "../store/project";
import { createComment, populateCommentsByTask } from "../store/comment";
import Comment from "./Comment";

const TaskDetails = ({ task, project }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session?.user)
    const projects = useSelector(state => Object.values(state.project))
    const tasks = useSelector(state => Object.values(state.task))
    const comments = useSelector(state => Object.values(state.comment))
    let submitComment;

    const [comment, setComment] = useState('')

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

    const updateTaskDetailsHandler = (id, e) => {
        dispatch(updateTask(id, { "new_details": e.target.value }))
        dispatch(populateTasksByProject(project.id))
        dispatch(populateProjectsByUser(user.id))
    }

    const submitDateHandler = (e, id) => {
        // console.log(e.target.value)
        dispatch(updateTask(id, { "due_date": e.target.value }))
        // dispatch(populateTasksByProject(thisPJ.id))
        dispatch(populateProjectsByUser(user.id))
    }

    const createCommentHandler = () => {
        if (comment) {
            let vals = {
                "user_id": user.id,
                "task_id": task.id,
                "comment": comment
            }
            dispatch(createComment(vals))
            dispatch(populateCommentsByTask(task.id))
            dispatch(populateTasksByProject(project.id))
            dispatch(populateProjectsByUser(user.id))
            setComment('')
        }
    }

    if (comment) {
        submitComment = <p onClick={() => createCommentHandler()} className="task-details-comment-submit">Comment</p>
    } else {
        submitComment = <p className="task-details-comment-submit-nothing">Comment</p>
    }

    return (
        <div className="task-details-sidebar">
            <div className="task-top-header">
                <div className="mark-task-complete-button">
                    <FontAwesomeIcon icon={faCheck} className="checkmark-task-icon" />
                    <p>Mark complete</p>
                </div>
            </div>
            <div className="task-details-main-comments">
                <div className="task-details-main">
                    <textarea onBlur={(e) => updateTaskNameHandler(task.id, e)} defaultValue={task.name} className="task-details-name" />
                    {task.due_date &&
                        <div className="duedate-data-in-details">
                            <p className="task-details-label">Due date</p>
                            <div className="duedate-data-compiled">
                                <p className="task-duedate-data-details">{task.due_date.slice(0, 16)}</p>
                                <input onChange={(e) => submitDateHandler(e, task.id)} className="task-duedate-input-details" type="date" />
                            </div>
                        </div>
                    }
                    {task.due_date === null &&
                        <div className="duedate-data-in-details">
                            <p className="task-details-label">Due date</p>
                            <div className="duedate-data-compiled">
                                <p className="task-duedate-data-details">No due date</p>
                                <input onChange={(e) => submitDateHandler(e, task.id)} className="task-duedate-input-details" type="date" />
                            </div>
                        </div>
                    }
                    <div className="duedate-data-in-details">
                        <p className="task-details-label">Project</p>
                        <div className="duedate-data-compiled">
                            <p className="task-duedate-data-details">{task.project}</p>
                        </div>
                    </div>
                    <div className="description-data-in-details">
                        <p className="task-details-label">Description</p>
                        <div className="duedate-data-compiled">
                            {task.details &&
                                <textarea placeholder="Add text description" onBlur={(e) => updateTaskDetailsHandler(task.id, e)} defaultValue={task.details} className="task-details-description" />
                            }
                            {task.details === null &&
                                <textarea placeholder="Add text description" onBlur={(e) => updateTaskDetailsHandler(task.id, e)} className="task-details-description" />
                            }
                        </div>
                    </div>
                </div>
                <div className="comments-show-div">
                    {task.comments && task.comments.map(comment => (

                        <Comment comment={comment} task={task} project={project} />

                    ))}
                </div>
            </div>
            <div className="task-details-add-comments">

                <div className="task-details-prof-pic">
                    <img src={user.profile_pic} className="task-commentbox-prof" />
                    <div className="task-details-add-comment-box">
                        <textarea placeholder="add a question or post a comment" value={comment} onChange={(e) => setComment(e.target.value)} className="task-details-comment-textarea" />
                        <div className="submit-comment-div">
                            {submitComment}
                        </div>
                    </div>
                </div>
                </div>

        </div>
    )
}

export default TaskDetails
