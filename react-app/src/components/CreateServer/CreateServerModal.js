import "./Modal.css";
import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        className="left_side_icon"
        src="../../../public/images/svgexport-14.png"
        alt="create server"
        onClick={() => setShowModal(true)}
      ></img>
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <CreateServer></CreateServer>
        </Modal>
      )}
    </>
  );
};

export default CreateServerModal;
