import "../styles/leftBar.css";

import DatabaseIcon from "../assets/icons/database.svg?react";
import RightArrowIcon from "../assets/icons/rightArrow.svg?react";
import DownArrowIcon from "../assets/icons/downArrow.svg?react";
import { useEffect, useState } from "react";

export default function LeftSideBar({ tables }) {
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
            Databases({Object.keys(tables).length})
          </h5>
        </div>
        <div
          className={`databases-contaier-display ${
            isDbDisplayOpen ? "open" : ""
          }`}
          aria-label="Databases Contaier Display"
        >
          {Object.keys(tables).map((key, indx) => (
            <div className="database" aria-label="database" key={indx}>
              <DatabaseIcon className="fa" />
              <h5>{key}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
