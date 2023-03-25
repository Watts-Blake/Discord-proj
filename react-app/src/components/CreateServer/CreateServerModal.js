import "./Modal.css";
import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateServer from ".";

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        className={
          hover === "new_server" ? "icon_container hover" : "icon_container"
        }
        onMouseEnter={() => setHover("new_server")}
        onMouseLeave={() => setHover(null)}
      >
        <img
          className="left_side_icon"
          src={
            hover === "new_server"
              ? "/svgs/svgexport-14-white.svg"
              : "/svgs/svgexport-14.svg"
          }
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
