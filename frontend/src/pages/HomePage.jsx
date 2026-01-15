import "../styles/HomePage.css";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";
import QueryConsole from "../components/QueryConsole";
import OutputConsole from "../components/OutputConsole";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage({
  tables,
  setTables,
  output,
  setOutput,
  command,
  setCommand,
  error,
  setError,
  text,
  setText,
  loading,
  setLoading,
}) {
  useEffect(() => {
    const getTables = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/tables");
        setTables(data.tables);
      } catch (err) {
        console.error(
          "Failed to fetch tables",
          err.response?.data || err.message
        );
      }
    };

    window.refreshTables = getTables;

    getTables();
  }, []);
  return (
    <main className="homePage" aria-label="home page">
      <TopBar />
      <div className="dispay-container">
        <LeftSideBar
          tables={tables}
          setError={setError}
          error={error}
          setCommand={setCommand}
          setOutput={setOutput}
          setText={setText}
          setLoading={setLoading}
        />
        <div className="input-output-display-container">
          <QueryConsole
            tables={tables}
            setTables={setTables}
            setOutput={setOutput}
            setCommand={setCommand}
            error={error}
            setError={setError}
            text={text}
            setText={setText}
            loading={loading}
            setLoading={setLoading}
          />
          <OutputConsole output={output} command={command} error={error} />
        </div>
      </div>
    </main>
  );
}
