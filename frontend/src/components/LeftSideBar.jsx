import "../styles/leftBar.css";

import TableIcon from "../assets/icons/table.svg?react";
import RightArrowIcon from "../assets/icons/rightArrow.svg?react";
import DownArrowIcon from "../assets/icons/downArrow.svg?react";
import { useState } from "react";
import axios from "axios";

export default function LeftSideBar({
  tables,
  setCommand,
  error,
  setError,
  setOutput,
  setText,
  setLoading,
}) {
  const [isDbCOtainerOpen, setIiDbCOtainerOpen] = useState(false);
  const [isDbDisplayOpen, setIsDbDisplayOpen] = useState(false);

  const handleDbContainer = () => {
    setIiDbCOtainerOpen((cond) => !cond);
    setIsDbDisplayOpen((cond) => !cond);
  };

  const runGetTableSql = async (tableName) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:5001/query`, {
        sql: `SELECT * FROM ${tableName}`,
      });

      if (!data.success) {
        return;
      }

      setOutput(data.result);
      setCommand(`SELECT * FROM ${tableName}`);
      setError({ ...error, errorStatus: false });
      setText(`SELECT * FROM ${tableName}`);
      setLoading(false);

      if (window.refreshTables) {
        window.refreshTables();
      }
    } catch (err) {
      setError({
        errorStatus: true,
        errorMessage: err.response?.data.error || err.message.error,
      });
      setLoading(false);

      console.error("Failed to run sql", err.response?.data || err.message);
    }
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
            <TableIcon className="fa" />
            Tables({tables.length})
          </h5>
        </div>
        <div
          className={`databases-contaier-display ${
            isDbDisplayOpen ? "open" : ""
          }`}
          aria-label="Databases Contaier Display"
        >
          {tables.map((table, idx) => (
            <div
              className="database"
              key={idx}
              aria-label="database"
              onClick={() => runGetTableSql(table.name)}
            >
              <TableIcon className="fa" />
              <h5>{table.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
