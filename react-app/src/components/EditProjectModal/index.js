import React, { useState } from "react";
import { Modal } from "../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import EditProject from "./EditProject";
import './EditProject.css'
function EditProjectModal({project}) {
  const [showModal, setShowModal] = useState(false);


  return (

    <>
    <FontAwesomeIcon onClick={() => setShowModal(true)} className="pj-info-icon" icon={faCircleQuestion} />
      {showModal && (
        <Modal id={'modal-content-one'} onClose={() => setShowModal(false)}>
          <EditProject project={project} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditProjectModal;
