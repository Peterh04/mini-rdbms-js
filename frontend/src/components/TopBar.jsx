import "../styles/topBar.css";
import DatabaseIcon from "../assets/icons/database.svg?react";

export default function TopBar() {
  return (
    <div className="top-bar-layout" aria-label="Top Bar Layout">
      <div className="top-bar-control-name">
        <h4>Mini RDBMS Client</h4>
        <DatabaseIcon className="fa" />
        <div
          className="top-bar-active-databases-display"
          aria-label="top bar active databases display"
        ></div>
      </div>
    </div>
  );
}
