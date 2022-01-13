import React from "react";
import "./styles.css";

export default function App() {

  /**
   * @description This function downdloads the file from base64 string recieved from server
   */
  // const downloadTimesheet = async () => {
  //   const timesheet = await fetch("http://localhost:4000/timesheet", {
  //     method: "GET",
  //   }).then((res) => res.json());

  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${timesheet.fileBase64}`;
  //   downloadLink.download = "timesheet.xlsx";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };


  /**
   * @description This function downdloads the file from blob recieved from server
   */
  const downloadTimesheet = async () => {
    const response = await fetch("http://localhost:4000/timesheet", {
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
  };

  return (
    <div className="App">
      <button onClick={downloadTimesheet} style={{ fontSize: 60 }}>
        Download Timesheet
      </button>
    </div>
  );
}
