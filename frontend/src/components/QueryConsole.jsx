import { useEffect, useRef, useState } from "react";
import "../styles/queryConsole.css";
import PlayIcon from "../assets/icons/play.svg?react";
import axios from "axios";

export default function QueryConsole({ tables, setTables, setOutput }) {
  const [text, setText] = useState("");
  const lines = text.split("\n").length;

  const textareaRef = useRef(null);
  const numberingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (numberingRef.current && textareaRef.current) {
        numberingRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    const textarea = textareaRef.current;
    textarea.addEventListener("scroll", handleScroll);

    return () => textarea.removeEventListener("scroll", handleScroll);
  }, []);

  const runSql = async () => {
    try {
      console.log(text);
      const { data } = await axios.post(`http://localhost:5001/query`, {
        sql: text,
      });

      if (!data.success) {
        setText("");
        return;
      }

      setOutput(data.result);

      const createTable = text.match(/CREATE TABLE (\w+)/i);
      if (createTable) {
        const tableName = createTable[1];

        setTables((prev) => ({
          ...prev,
          [tableName]: data.result || [],
        }));

        localStorage.setItem(
          "tables",
          JSON.stringify({
            ...tables,
            [tableName]: data.result || [],
          })
        );
      }
      console.log(data);
    } catch (err) {
      console.error("Failed to run sql", err.response?.data || err.message);
    }
  };

  return (
    <main className="query-console" aria-label="query console">
      <div className="query-console-header" aria-label="query console header">
        <h4>Query</h4>
        <button className="runSqlBtn" onClick={runSql}>
          <PlayIcon className="fa" />
        </button>
      </div>
      <div className="query-terminal" aria-label="Query Terminal">
        <div
          className="query-terminal-numbering"
          aria-label="Query Terminal Numbering"
          ref={numberingRef}
        >
          {Array.from({ length: lines }).map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div
          className="query-terminal-console"
          aria-label="Query Terminal Console"
        >
          <textarea
            ref={textareaRef}
            name="sql-input"
            id="sql-input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
    </main>
  );
}
