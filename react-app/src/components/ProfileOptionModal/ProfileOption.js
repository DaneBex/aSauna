import React from "react";
import './ProfileOption.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/session";


const ProfileOption = ({ user }) => {
    const dispatch = useDispatch()
    let submitButton;

    const [profPic, setProfPic] = useState('')
    const [username, setUsername] = useState('')
    const [aboutme, setAboutme] = useState('')

    if (!profPic && !username && !aboutme) {
        submitButton = <p className="prof-setting-submit-nothing">Save Changes</p>
    } else {
        submitButton = <button type="submit" className="prof-setting-submit">Save Changes</button>
    }

    const updateProfHandler = (e) => {
        e.preventDefault()
        let vals = {}
        if (profPic) vals["profile_pic"] = profPic
        if (username) vals["username"] = username
        if (aboutme) vals["about_me"] = aboutme

        dispatch(updateUser(user.id, vals))
    }

    return (
        <div className="entire-prof-setting-page">
            <div className="top-prof-setting">
                <h1>My Settings</h1>
            </div>
            <form onSubmit={updateProfHandler} className="prof-setting-form">
                <div className="prof-setting-input">
                    <label className="your-photo-edit">
                        Your photo link
                    </label>
                    <textarea value={profPic} onChange={(e) => setProfPic(e.target.value)} placeholder="Photos help your teammates recognize you in aSauna. Photo link here" className="prof-setting-prof-url" />
                </div>
                <div className="prof-setting-input">
                    <label className="your-photo-edit">Your username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="prof-setting-username-edit" />
                </div>
                <div className="prof-setting-input">
                    <label className="your-photo-edit">About me</label>
                    <textarea value={aboutme} onChange={(e) => setAboutme(e.target.value)} className="prof-setting-prof-url" placeholder="I usually work 9am-5pm PST. Feel free to assign me a task with a due date anytime. Also I love cats!" />
                </div>
                <p>Signed up on {user.created_at.slice(5, 16)}</p>
                {submitButton}
            </form>
        </div>
    )
}

export default ProfileOption
