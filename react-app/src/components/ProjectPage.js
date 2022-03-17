import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion
} from "@fortawesome/free-regular-svg-icons";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteProject, populateProjectsByUser, updateProject } from "../store/project";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import './ProjectPage.css'
import { faL } from "@fortawesome/free-solid-svg-icons";
import EditProjectModal from "./EditProjectModal";


const ProjectPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { projectId } = useParams()

    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
    }, [])

    const [pjDetails, setPjDetails] = useState(false)
    const [pjColors, setPjColors] = useState(false)
    const [pjSettings, setPjSettings] = useState(false)

    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)

    console.log(projects)

    const thisPJ = projects.find(project => project.id === parseInt(projectId))
    console.log(thisPJ)

    const closePJOptions = () => {
        if (pjDetails) setPjDetails(false)
        else setPjDetails(true)
    }

    const closePjColors = () => {
        if (pjColors) setPjColors(false)
        else setPjColors(true)
    }

    const removeProject = (id) => {
        dispatch(deleteProject(id))
        return history.push('/')
    }

    const updatePjColor = (e) => {
        dispatch(updateProject(thisPJ.id, e.target.id))
    }



    return (
        <div className="project-page-whole-page">
            <NavBar projects={projects} />
            <div className="main-project-page">
                <div className="top-of-home">
                    <div className="project-page-top-left">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
