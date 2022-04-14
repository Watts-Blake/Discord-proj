import "./Modal.css";

import { useState } from "react";

const EditServer = ({ serversObj, user, setShowModal }) => {
  const server = serversObj.currentServer;
  const [selected, setSelected] = useState("Overview");
  return (
    <div id="server_opts_base" className="edit_server_modal">
      <div id="server_opts_base2" className="edit_options">
        <h3 id="server_opts_base3">{server.name.toUpperCase()}</h3>
        <h4 id="server_opts_base4" onClick={() => setSelected("Overview")}>
          Overview
        </h4>
        <div id="server_opts_base5" className="user_management">
          <h3 id="server_opts_base6">USER MANAGEMENT</h3>
          <h4 id="server_opts_base7">Members</h4>
        </div>
      </div>
      <div id="server_opts_base8" className="info">
        {selected === "Overview" && (
          <div id="server_opts_base111">
            <h1 id="server_opts_base9">Server Overview</h1>
            <img
              id="server_opts_base10"
              src={server.picture}
              className="server_picture"
              alt="serverPic"
            />
            <img
              src="/svgs/edit-server-img.svg"
              alt="serv"
              id="server_opts_base101"
            />
            <div id="server_opts_base11" className="upload_image">
              <p id="server_opts_base12">
                We recommend an image of at least 512x512 for the server
              </p>
              <h3 id="server_opts_base13" className="upload_image_btn">
                Upload Image
              </h3>
            </div>

            <input
              id="server_opts_base14"
              className="server_name"
              defaultValue={server.name}
              placeholder={server.name}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditServer;
