import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import "./styles.css";

export default function App() {
  const [data, setData] = React.useState([]);

  /**
   * @description This function downdloads the file from blob recieved from server
   */
  const downloadTimesheet = async () => {
    try {
      const response = await fetch("http://localhost:4000/timesheet/download", {
        method: "GET",
      });
      const timesheet = await response.blob();
      const url = window.URL.createObjectURL(timesheet);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "Timesheet.xlsx";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log(error);
    }
  };

  const timesheetData = async () => {
    try {
      const response = await fetch("http://localhost:4000/timesheet?user=7", {
        method: "GET",
      }).then((res) => res.json());

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    timesheetData();
  }, []);

  return (
    <div className="App">
      <button onClick={downloadTimesheet} style={{ fontSize: 60 }}>
        Download Timesheet
      </button>
      <Dashboard data={data} />
    </div>
  );
}
