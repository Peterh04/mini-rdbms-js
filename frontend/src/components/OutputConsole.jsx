import { useEffect } from "react";
import "../styles/outputConsole.css";

export default function OutputConsole() {
  const columns = ["Booking ID", "Guest Name", "Room Type", "Check-in"];
  const rows = [
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 2,
      "Guest Name": "Mary",
      "Room Type": "Standard",
      "Check-in": "2026-01-15",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
    {
      "Booking ID": 1,
      "Guest Name": "John",
      "Room Type": "Deluxe",
      "Check-in": "2026-01-14",
    },
  ];

  useEffect(() => {
    console.log(rows.length);
  }, []);
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
      </div>
    </main>
  );
}
