import "./Modal.css";

import { getOneChannel } from "../../store/channels";
import { Modal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import EditChannel from ".";
import { useState } from "react";
const EditChannelModal = ({ channel, user }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = async () => {
    await dispatch(getOneChannel(channel.id)).then(() => setShowModal(true));
  };
  return (
    <>
      <img src="/svgs/settings.svg" alt="add" onClick={handleOpen} />
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
