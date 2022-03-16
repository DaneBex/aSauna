import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faRectangleList
} from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { populateProjectsByUser } from "../store/project";
import ColorPicker from "./ColorPicker";
import NavBar from "./NavBar";
import './ProjectPage.css'


const ProjectPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {projectId} = useParams()

    useEffect(() => {
        dispatch(populateProjectsByUser(user.id))
    }, [])

    const projectsObj = useSelector(state => state.project)
    const projects = Object.values(projectsObj)

    const thisPJ = projects[projectId - 1]
    console.log(thisPJ)


    return (
        <div className="project-page-whole-page">
            <NavBar projects={projects} />
            <div className="main-project-page">
                <div className="top-of-home">
                    <div className="project-page-top-left">
                {thisPJ && thisPJ.color &&
                    <FontAwesomeIcon className={`rectangle-list-icon-${thisPJ.color}`} icon={faRectangleList} />
                }
                {thisPJ && thisPJ.color === null &&
                <FontAwesomeIcon className={`rectangle-list-icon-${ColorPicker()}`} icon={faRectangleList} />
                }
                {thisPJ && thisPJ.name.length > 11 &&
                <h1 className="project-page-name">{thisPJ.name.slice(0, 11) + '...'}</h1>
                }
                {thisPJ && thisPJ.name.length < 12 &&
                <h1 className="project-page-name">{thisPJ.name}</h1>
                }
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
