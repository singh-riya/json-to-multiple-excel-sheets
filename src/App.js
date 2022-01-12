import React from "react";
// import XlsPopulate from "./screens/XlsPopulate";
// import HomeScreen from "./screens/HomeScreen";
// import XlsDoc from "./screens/XlsDoc";
import "./styles.css";

export default function App() {
  const downloadTimesheet = async () => {
    const timesheet = await fetch("http://localhost:4000/timesheet", {
      method: "GET",
    }).then((res) => res.json());

    const downloadLink = document.createElement("a");
    downloadLink.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${timesheet.fileBase64}`;
    downloadLink.download = "timesheet.xlsx";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="App">
      {/* <XlsPopulate /> */}
      <hr />
      {/* <XlsDoc /> */}
      <hr />
      {/* <HomeScreen /> */}
      <button onClick={downloadTimesheet} style={{ fontSize: 60 }}>
        Download Timesheet
      </button>
    </div>
  );
}
