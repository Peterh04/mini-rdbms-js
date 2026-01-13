import "../styles/topBar.css";
import QueryToolIcon from "../assets/icons/queryTool.svg?react";

export default function TopBar() {
  return (
    <div className="top-bar-layout" aria-label="Top Bar Layout">
      <div className="top-bar-control-name">
        <h4>Mini RDBMS Client</h4>
        <button className="query-tool-btn" aria-label="Query tool button">
          <QueryToolIcon className="fa" />
        </button>

        <div
          className="top-bar-active-databases-display"
          aria-label="top bar active databases display"
        ></div>
      </div>
    </div>
  );
}
