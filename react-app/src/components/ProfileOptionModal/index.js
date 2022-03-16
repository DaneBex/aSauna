import React, { useState } from "react";
import { Modal } from "../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import ProfileOption from "./ProfileOption";

function ProfileOptionModal({user}) {
  const [showModal, setShowModal] = useState(true);

  console.log('HELLO')

  return (
    <>
        <Modal id={'modal-content-one'} onClose={() => setShowModal(false)}>
          <ProfileOption user={user} />
        </Modal>
    </>
  );
}

export default ProfileOptionModal;
