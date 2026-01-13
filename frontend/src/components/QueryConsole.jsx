import "../styles/queryConsole.css";

export default function QueryConsole() {
  return (
    <main className="query-console" aria-label="query console">
      <div className="query-console-header" aria-label="query console header">
        <h5>Query</h5>
      </div>
      <div className="query-terminal" aria-label="Query Terminal">
        <div
          className="query-terminal-numbering"
          aria-label="Query Terminal Numbering"
        >
          1
        </div>
        <div
          className="query-terminal-console"
          aria-label="Query Terminal Console"
        >
          <input type="text" name="sql-input" id="sql-input" />
        </div>
      </div>
    </main>
  );
}
