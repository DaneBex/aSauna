

const ADD_COMMENT = "comment/ADD_COMMENT"
const LOAD_COMMENT_BY_TASK = "comment/LOAD_COMMENT"
const DELETE_COMMENT = "comment/DELETE_COMMENT"
const UPDATE_COMMENT = "commment/UPDATE_COMMENT"


const add_comment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const load_comment = (comments) => ({
    type: LOAD_COMMENT_BY_TASK,
    comments
})

const remove_comment = (deletedComment) => ({
    type: DELETE_COMMENT,
    deletedComment
})


export const createComment = (comment) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(add_comment(comment))
        return comment
    }
}

export const deleteComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deletedComment = await response.json()
        dispatch(remove_comment(deletedComment))
    }
}

export const populateCommentsByTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${taskId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(load_comment(comments))
    }
}

export const updateComment = (id, formInfo) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(add_comment(updatedComment))
    }
}

const commentReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENT_BY_TASK: {

            newState = JSON.parse(JSON.stringify(state));
            action.comments.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
        }
        case ADD_COMMENT: {
            newState = JSON.parse(JSON.stringify(state));
            console.log(newState)
            newState[action.comment.id] = action.comment
            console.log(newState)
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state }
            delete newState[action.deletedComment.id];
            return newState;
        }
        default:
            return state
    }
}

export default commentReducer
