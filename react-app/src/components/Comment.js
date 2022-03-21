import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as fasCircle, faCheck, faCircleCheck as fasCircleCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { deleteComment, populateCommentsByTask, updateComment } from "../store/comment";
import { populateProjectsByUser } from "../store/project";
import { populateTasksByProject } from "../store/task";


const Comment = ({ comment, task, project }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session?.user)
    const comments = useSelector(state => Object.values(state.comment))
    const tasks = useSelector(state => Object.values(state.task))
    const projects = useSelector(state => Object.values(state.project))

    let submitComment;

    const [editComment, setEditComment] = useState(0)
    const [editedComment, setEditedComment] = useState('')
    const [commentOptions, setCommentOptions] = useState(0)

    const closeCOptions = (id) => {
        if (commentOptions) setCommentOptions(0)
        else setCommentOptions(id)
    }


    const updateCommentHandler = () => {
        dispatch(updateComment(comment.id, { "new_comment": editedComment }))
        dispatch(populateCommentsByTask(task.id))
        dispatch(populateTasksByProject(project.id))
        dispatch(populateProjectsByUser(user.id))
        setEditComment(0)
    }

    const removeComment = (id) => {
        dispatch(deleteComment(id))
        dispatch(populateCommentsByTask(task.id))
        dispatch(populateTasksByProject(project.id))
        dispatch(populateProjectsByUser(user.id))
    }

    if (editedComment && editedComment !== comment.comment) {
        submitComment = <p onClick={() => updateCommentHandler()} className="task-details-comment-edit-submit">Save changes</p>
    } else {
        submitComment = <p className="task-details-comment-edit-submit-nothing">Save changes</p>
    }


    return (
        <div className="each-comment-div">
            <div className="comment-user-pic">
                <img src={comment.user_prof_pic} className="each-comment-prof-pic" />
            </div>
            {commentOptions === comment.id &&
                <div className="comment-options-dropdown">
                    <div className="comment-dropdown-option">
                        <p onClick={() => {
                            setCommentOptions(0)
                            setEditComment(comment.id)
                        }} className="comment-dropdown-text">Edit Comment</p>
                    </div>
                    <div className="comment-dropdown-option">
                        <p onClick={() => removeComment(comment.id)} className="comment-dropdown-text">Delete Comment</p>
                    </div>
                </div>
            }
            {editComment !== comment.id &&
                <div className="comment-name-info">
                    <p className="comment-info-username">{comment.user_username}</p>
                    <p>{comment.comment}</p>
                    <FontAwesomeIcon onClick={() => closeCOptions(comment.id)} className="edit-delete-comment-dropdown" icon={faEllipsis} />
                </div>
            }
            {editComment === comment.id &&
                <div className="comment-name-info-edit">
                    <p className="comment-info-username">{comment.user_username}</p>
                    <div className="task-details-edit-comment-box">
                        <textarea defaultValue={comment.comment} onChange={(e) => setEditedComment(e.target.value)} className="task-details-edit-comment-textarea" />
                        <div className="submit-comment-div">
                            <div className="cancel-edit-comment-button">
                            <p onClick={() => setEditComment(0)} className="cancel-edit-comment-text">Cancel</p>
                            </div>
                            {submitComment}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Comment
