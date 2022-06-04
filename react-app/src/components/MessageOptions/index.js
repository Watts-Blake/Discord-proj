import "./MessageOptions.css";

import { useState, useEffect } from "react";

const MessageOptions = ({ message, user, server }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div>
        {(user.id === message.senderId || user.id === server.owner.id) && (
          <>
            <button>
              <img src="/svgs/pencil.svg" alt="edit" className="edit" />
            </button>
            <button>
              <img src="/svgs/trash.svg" alt="delete" />
            </button>
          </>
        )}
      </div>
    )
  );
};

export default MessageOptions;
