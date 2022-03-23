

const ADD_PROJECT = "project/ADD_PROJECT"
const LOAD_PROJECT_BY_USER = "project/LOAD_PROJECT"
const DELETE_PROJECT = "project/DELETE_PROJECT"
const UPDATE_PROJECT = "project/UPDATE_PROJECT"



const add_project = (project) => ({
    type: ADD_PROJECT,
    project
})

const load_project = (projects) => ({
    type: LOAD_PROJECT_BY_USER,
    projects
})

const remove_project = (deletedProject) => ({
    type: DELETE_PROJECT,
    deletedProject
})

const changeProject = (project) => {
    console.log(project)
    return {
    type: UPDATE_PROJECT,
    project
    }
}

export const createProject = (project) => async (dispatch) => {

    const response = await fetch('/api/projects/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
    if (response.ok) {
        const project = await response.json();
        dispatch(add_project(project))
        return project
    }
}

export const populateProjectsByUser = () => async (dispatch) => {

    const response = await fetch(`/api/projects/`)

    if (response.ok) {
        const projects = await response.json()
        dispatch(load_project(projects))
    }
}

export const deleteProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deletedProject = await response.json();
        dispatch(remove_project(deletedProject))
    }
}

export const updateProject = (id, formInfo) => async (dispatch) => {
    console.log(JSON.stringify(formInfo))
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
    })

    if (response.ok) {
        const updatedProject = await response.json();
        console.log(updatedProject)
        dispatch(add_project(updatedProject))
    }
}




const projectReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROJECT_BY_USER: {
            newState = JSON.parse(JSON.stringify(state));
            action.projects.projects.forEach(project => {
                newState[project.id] = project
            })
            return newState;
        }
        case ADD_PROJECT: {
            // return { [action.project.id]: action.project, ...state }
            newState = { ...state }
            newState[action.project.id] = action.project
            return newState;
        }
        case DELETE_PROJECT: {
            newState = { ...state };
            delete newState[action.deletedProject.id];
            return newState
        }
        case UPDATE_PROJECT: {
            return { [action.project.id]: action.project, ...state }
        }
        default:
        return state;
    }
}

export default projectReducer
