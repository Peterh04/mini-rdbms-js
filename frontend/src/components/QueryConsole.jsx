import { useEffect, useRef, useState } from "react";
import "../styles/queryConsole.css";

export default function QueryConsole() {
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

  return (
    <main className="query-console" aria-label="query console">
      <div className="query-console-header" aria-label="query console header">
        <h4>Query</h4>
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
