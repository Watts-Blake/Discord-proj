import "./Modal.css";
import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="icon_container">
        <img
          className="left_side_icon"
          src="/svgs/svgexport-14.svg"
          alt="create server"
          onClick={() => setShowModal(true)}
        ></img>
      </button>
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <CreateServer setShowModal={setShowModal}></CreateServer>
        </Modal>
      )}
    </>
  );
};

export default CreateServerModal;
