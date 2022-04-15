import "./Modal.css";

import { Modal } from "../../context/Modal";
import EditChannel from ".";
import { useState } from "react";
const EditChannelModal = ({ channel, user }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <img
        src="/svgs/settings.svg"
        alt="add"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <EditChannel
            channel={channel}
            setShowModal={setShowModal}
            user={user}
          ></EditChannel>
        </Modal>
      )}
    </>
  );
};

export default EditChannelModal;
