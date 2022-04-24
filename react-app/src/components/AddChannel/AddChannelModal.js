import "./Modal.css";

import "./Modal.css";
import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import CreateChannel from ".";

const CreateChannelModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button>
        <img
          className="channels_plus"
          src="/svgs/grey-plus.svg"
          alt="add"
          onClick={() => setShowModal(true)}
        />
      </button>
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <CreateChannel setShowModal={setShowModal}></CreateChannel>
        </Modal>
      )}
    </>
  );
};

export default CreateChannelModal;
