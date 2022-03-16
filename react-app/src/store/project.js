

const ADD_PROJECT = "project/ADD_PROJECT"
const LOAD_PROJECT_BY_USER = "projects/LOAD_PROJECT"



const add_project = (project) => ({
    type: ADD_PROJECT,
    project
})

const load_project = (projects) => ({
    type: LOAD_PROJECT_BY_USER,
    projects
})

export const createProject = (project) => async (dispatch) => {
    console.log('hit')
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
    }
}

export const populateProjectsByUser = (userId) => async (dispatch) => {
    
    const response = await fetch(`/api/projects/${userId}`)

    if (response.ok) {
        const projects = await response.json()
        dispatch(load_project(projects))
    }
}


const projectReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROJECT_BY_USER: {
            newState = {};
            action.projects.projects.forEach(project => {
                newState[project.id] = project
            })
            return newState;
        }
        case ADD_PROJECT: {
            return { [action.project.id]: action.project, ...state }
        }
        default:
        return state;
    }
}

export default projectReducer
