import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, deleteProject } from "../store/project";
import { logout } from "../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSquarePlus, faCircleCheck as farCircleCheck, faCaretSquareDown, faRectangleList, faCircleDown, faPenToSquare, faCircleQuestion, faPlusSquare, faCircle as farCircle
} from "@fortawesome/free-regular-svg-icons";
import { faCircle as fasCircle, faCheck, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { NavLink, useHistory } from "react-router-dom";
import ColorPicker from "./ColorPicker";
import EditProjectModal from "./EditProjectModal";
import ProfileOptionModal from "./ProfileOptionModal";


const ProjectTop = ({ thisPJ }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session?.user)
    const projects = useSelector(state => Object.values(state.project))

    const [pjDetails, setPjDetails] = useState(false)
    const [pjColors, setPjColors] = useState(false)
    const [statusSetting, setStatusSetting] = useState(false)
    const [profOpen, setProfOpen] = useState(false)

    const updatePjStatus = (str) => {
        setStatusSetting(false)
        dispatch(updateProject(thisPJ?.id, str))
    }

    const updatePjColor = (e) => {
        setPjColors(false)
        dispatch(updateProject(thisPJ?.id, e.target.id))
    }

    const removeProject = (id) => {
        dispatch(deleteProject(id))
        return history.push('/')
    }

    const closeProf = () => {
        if (profOpen) setProfOpen(false)
        else setProfOpen(true)
    }

    const closeStatus = () => {
        // e.stopPropogation()
        if (statusSetting) setStatusSetting(false)
        else setStatusSetting(true)
    }

    const closePJOptions = () => {
        if (pjDetails) setPjDetails(false)
        else setPjDetails(true)
    }

    const closePjColors = () => {
        if (pjColors) setPjColors(false)
        else setPjColors(true)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <div className="project-top-of-home">
                    <div className="project-page-top-left">
                        <div className="project-top-left-top">
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
                                        <p onClick={() => removeProject(thisPJ.id)}>Delete Project</p>
                                    </div>
                                </div>
                            }
                            <EditProjectModal project={thisPJ} />
                            <div onClick={(e) => closeStatus()} className="set-status-div">
                                {thisPJ?.status === null &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle" icon={farCircle} />
                                        <p className="status-text">Set status</p>
                                    </>
                                }
                                {thisPJ?.status === 1 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-green" icon={fasCircle} />
                                        <p className="status-text">On track</p>
                                    </>
                                }
                                {thisPJ?.status === 2 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-yellow" icon={fasCircle} />
                                        <p className="status-text">At risk</p>
                                    </>
                                }
                                {thisPJ?.status === 3 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-red" icon={fasCircle} />
                                        <p className="status-text">Off track</p>
                                    </>
                                }
                                {thisPJ?.status === 4 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-circle-blue" icon={fasCircle} />
                                        <p className="status-text">On hold</p>
                                    </>
                                }
                                {thisPJ?.status === 5 &&
                                    <>
                                        <FontAwesomeIcon className="set-status-check" icon={fasCircleCheck} />
                                        <p className="status-text">Complete!</p>
                                    </>
                                }
                                {statusSetting &&
                                    <div className="set-status-box">
                                        <div className="top-of-status-box">Update status</div>
                                        <div className="all-status-options">
                                            <div onClick={() => updatePjStatus('green')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-green" icon={fasCircle} />
                                                <p className="status-text">On track</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('yellow')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-yellow" icon={fasCircle} />
                                                <p className="status-text">At risk</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('red')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-red" icon={fasCircle} />
                                                <p className="status-text">Off track</p>
                                            </div>
                                            <div onClick={() => updatePjStatus('blue')} className="status-option">
                                                <FontAwesomeIcon className="set-status-circle-blue" icon={fasCircle} />
                                                <p className="status-text">On hold</p>
                                            </div>
                                        </div>
                                        <div onClick={() => updatePjStatus('complete')} className="status-option">
                                            <FontAwesomeIcon className="set-status-check" icon={fasCircleCheck} />
                                            <p className="status-text-complete">Complete</p>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                        {/* <div className="project-top-left-bottom">
                            <NavLink to={`/my_projects/overview/${thisPJ.id}`} className="project-view-options">Overview</NavLink>
                            <NavLink to={`/my_projects/${thisPJ.id}`} className="project-view-options">List</NavLink>
                        </div> */}
                    </div>
                    {user.profile_pic &&
                        <img onClick={closeProf} className="user-prof-pic" src={user.profile_pic} />
                    }
                    {user.profile_pic === null &&
                        <img onClick={closeProf} className="user-prof-pic" src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' />
                    }
                    {profOpen &&
                        <div className="profile-options-project-page">
                            <ProfileOptionModal user={user} />
                            <p onClick={logoutHandler} className="profile-option">Log Out</p>

                        </div>
                    }
                </div>
    )
}

export default ProjectTop
