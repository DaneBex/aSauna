import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../store/project";
import './EditProject.css'


const EditProject = ({ project }) => {
    const dispatch = useDispatch()
    let submitButton;

    const [name, setName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [details, setDetails] = useState(project.details)

    if (!name && !dueDate && !details) {
        submitButton = <p className="prof-setting-submit-nothing">Save Changes</p>
    } else {
        submitButton = <button type="submit" className="prof-setting-submit">Save Changes</button>
    }

    const updatePjHandler = (e) => {
        e.preventDefault()
        let vals = {}
        if (name) vals["name"] = name
        if (dueDate) vals["dueDate"] = dueDate
        if (details) vals["details"] = details

        dispatch(updateProject(project.id, vals))
    }

    return (
        <div className="entire-pj-setting-page">
            <div className="top-prof-setting">
                <h1>Project details</h1>
            </div>
            <form onSubmit={updatePjHandler} className="prof-setting-form">
                <div className="prof-setting-input">
                    <label className="your-photo-edit">
                        Name
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="prof-setting-username-edit" />
                </div>
                <div className="prof-setting-input">
                    <label className="your-photo-edit">
                        Due date
                    </label>
                    <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="proj-settings-due-date" />
                </div>
                <div className="prof-setting-input">
                    <label className="proj-details-label">
                    Explain your project
                    </label>
                    <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="proj-details-textarea" placeholder="Add Project details and other important information" />
                </div>
                {submitButton}
            </form>
        </div>
    )
}

export default EditProject
