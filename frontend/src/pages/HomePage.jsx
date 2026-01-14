import "../styles/HomePage.css";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";
import QueryConsole from "../components/QueryConsole";
import OutputConsole from "../components/OutputConsole";

export default function HomePage({
  tables,
  setTables,
  output,
  setOutput,
  command,
  setCommand,
  error,
  setError,
}) {
  return (
    <main className="homePage" aria-label="home page">
      <TopBar />
      <div className="dispay-container">
        <LeftSideBar tables={tables} />
        <div className="input-output-display-container">
          <QueryConsole
            tables={tables}
            setTables={setTables}
            setOutput={setOutput}
            setCommand={setCommand}
            error={error}
            setError={setError}
          />
          <OutputConsole output={output} command={command} error={error} />
        </div>
      </div>
    </main>
  );
}
