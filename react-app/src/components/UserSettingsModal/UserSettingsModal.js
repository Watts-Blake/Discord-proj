import "./UserSettings.css";

import React, { useState } from "react";
import { useEffect } from "react";
import UserSettings from ".";

const UserSettingsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const addEvent = (e) => {
    if (!e.target.id.includes("uset")) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    if (showModal) {
      document.addEventListener("click", addEvent, true);
    }
    if (!showModal) {
      document.removeEventListener("click", addEvent, true);
    }
  }, [showModal]);

  return (
    <>
      <div
        className="logged_user_right"
        onClick={() => setShowModal(true)}
        id={showModal ? "uset_open" : "close"}
      >
        <img src="/svgs/svgexport-67.svg" alt="settings" />
      </div>
      {showModal && <UserSettings setShowModal={setShowModal}></UserSettings>}
    </>
  );
};

export default UserSettingsModal;
