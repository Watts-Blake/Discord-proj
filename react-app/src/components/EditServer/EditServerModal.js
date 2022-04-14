import "./Modal.css";
import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import EditServer from ".";

const EditServerModal = ({ serversObj, user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="sing_server_opt"
        id="server_opts_edit"
      >
        <h4 id="server_opts_edit_title">Server Settings</h4>
        <img id="server_opts_edit_img" src="/svgs/settings.svg" alt="add" />
      </div>
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
