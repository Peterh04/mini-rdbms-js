import { useEffect, useState } from "react";
import "../styles/outputConsole.css";

export default function OutputConsole({ output }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  // const columns = ["Booking ID", "Guest Name", "Room Type", "Check-in"];

  useEffect(() => {
    const drawTable = () => {
      if (output.length === 0) {
        return;
      } else {
        setColumns(Object.keys(output[0]));
        setRows(output);
      }
    };

    drawTable();
  }, [output]);
  return (
    <main aria-label="output console" className="output-console">
      <div className="output-console-header" aria-label="output console header">
        <div>Data Output</div>
        <div>Messages</div>
      </div>
      <div
        className="output-console-display"
        aria-label="output console display"
      >
        {output.length > 0 && (
          <table className="table">
            <colgroup>
              <col className="col-style" />
              {columns.map((_, i) => (
                <col key={i} className="col-style" />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th></th>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
