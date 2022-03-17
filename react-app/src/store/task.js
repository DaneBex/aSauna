

const ADD_TASK = "task/ADD_TASK"
const LOAD_TASK_BY_PROJECT = "task/LOAD_TASK"
const DELETE_TASK = "task/DELETE_TASK"
const UPDATE_TASK = "task/UPDATE_TASK"



const add_task = (task) => ({
    type: ADD_TASK,
    task
})

const load_task = (tasks) => {
    return {
        type: LOAD_TASK_BY_PROJECT,
        tasks
    }
}

const remove_task = (deletedTask) => ({
    type: DELETE_TASK,
    deletedTask
})


export const createTask = (task) => async (dispatch) => {
    const response = await fetch('/api/tasks/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })

    if (response.ok) {
        const task = await response.json()
        dispatch(add_task(task))
        return task
    }
}

export const updateTask = (id, formInfo) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
    })

    if (response.ok) {
        const updatedTask = await response.json();
        dispatch(add_task(updatedTask))
    }
}

export const populateTasksByProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${projectId}`)

    if (response.ok) {
        const tasks = await response.json()
        dispatch(load_task(tasks))
    }
}


const taskReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TASK_BY_PROJECT: {
            newState = {};
            action.tasks.tasks.forEach(task => {
                newState[task.id] = task
            })
            return newState;
        }
        case ADD_TASK: {
            newState = { ...state }
            newState[action.task.id] = action.task
            return newState
        }
        default:
            return state
    }
}

export default taskReducer
