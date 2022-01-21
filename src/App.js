import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

export const generateMockDataFor30Days = () => {
  const mockData = [];
  for (let i = 0; i < 30; i++) {
    mockData.push({
      date:  new Date(2022, 0, i + 1).toLocaleDateString(),
      feature: "task 1",
      subject: "worked for on task 1",
      hours: 8,
    });
  }
  return { id: 1, name: "Riya Singh", timesheet: mockData };
};

export default function App() {
  const [data, setData] = useState([]);

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

      // setData(response);
      setData(generateMockDataFor30Days());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    timesheetData();
  }, []);

  return (
    <div className="App">
      
      {/* <ThemeProvider theme={theme}> */}
      {/* <button onClick={downloadTimesheet} style={{ fontSize: 60 }}>
        Download Timesheet
      </button> */}
      <Box m={4} >
        <Dashboard data={data} />
      </Box>
      {/* </ThemeProvider> */}
    </div>
  );
}
