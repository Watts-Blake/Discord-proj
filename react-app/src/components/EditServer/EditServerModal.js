import "./Modal.css";

import { Modal } from "../../context/Modal";
import EditServer from ".";

const EditServerModal = ({ currentServer, user, showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <EditServer
            setShowModal={setShowModal}
            server={currentServer}
            user={user}
          ></EditServer>
        </Modal>
      )}
    </>
  );
};

export default EditServerModal;
