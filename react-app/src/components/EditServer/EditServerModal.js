import "./Modal.css";

import { Modal } from "../../context/Modal";
import EditServer from ".";

const EditServerModal = ({ serversObj, user, showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <Modal className="modal" onClose={() => setShowModal(false)}>
          <EditServer
            setShowModal={setShowModal}
            serversObj={serversObj}
            user={user}
          ></EditServer>
        </Modal>
      )}
    </>
  );
};

export default EditServerModal;
