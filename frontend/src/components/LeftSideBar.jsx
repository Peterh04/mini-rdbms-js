import "../styles/leftBar.css";

import DatabaseIcon from "../assets/icons/database.svg?react";
import RightArrowIcon from "../assets/icons/rightArrow.svg?react";
import DownArrowIcon from "../assets/icons/downArrow.svg?react";
import { useState } from "react";

export default function LeftSideBar() {
  const [isDbCOtainerOpen, setIiDbCOtainerOpen] = useState(false);
  const [isDbDisplayOpen, setIsDbDisplayOpen] = useState(false);

  const handleDbContainer = () => {
    setIiDbCOtainerOpen((cond) => !cond);
    setIsDbDisplayOpen((cond) => !cond);
  };

  return (
    <div className="left-bar-layout" aria-label="Left Bar Layout">
      <div className="databases-container">
        <div
          className="databases-container-heaader"
          aria-label="Databases Container Heaader"
        >
          <button onClick={handleDbContainer}>
            {!isDbCOtainerOpen ? (
              <RightArrowIcon className="fa" />
            ) : (
              <DownArrowIcon className="fa" />
            )}
          </button>
          <h5>
            <DatabaseIcon className="fa" />
            Databases(2)
          </h5>
        </div>
        <div
          className={`databases-contaier-display ${
            isDbDisplayOpen ? "open" : ""
          }`}
          aria-label="Databases Contaier Display"
        >
          <div className="database" aria-label="database">
            <DatabaseIcon className="fa" />
            <h5>Users</h5>
          </div>
          <div className="database" aria-label="database">
            <DatabaseIcon className="fa" />
            <h5>Orders</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
