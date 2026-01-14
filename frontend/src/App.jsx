import { useEffect, useState } from "react";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";

function App() {
  const [tables, setTables] = useState({});
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const savedTables = JSON.parse(localStorage.getItem("tables")) || {};
    setTables(savedTables);
  }, []);
  return (
    <>
      <HomePage
        tables={tables}
        setTables={setTables}
        output={output}
        setOutput={setOutput}
      />
    </>
  );
}

export default App;
