import "./Wampus.css";

const Wampus = () => {
  return (
    <div className="no_page">
      <div className="msg_container">
        <h3>WAMP WAMP!!!</h3>
        <h1>{`404 page could not be found . . .`}</h1>
      </div>
      <img className="wampus" src="/svgs/wampus.svg" alt="wampus" />
      <h3>Wampus doesnt like it when you he can't give you what you want!</h3>
    </div>
  );
};

export default Wampus;
