import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { dark, light, theme } from "./theme";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export const generateMockDataFor30Days = () => {
  const mockData = [];
  for (let i = 0; i < 30; i++) {
    mockData.push({
      date: new Date(2022, 0, i + 1).toLocaleDateString(),
      feature: "task 1",
      subject: "worked for on task 1",
      hours: 8,
    });
  }
  return { id: 1, name: "Riya Singh", timesheet: mockData };
};

export default function App() {
  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
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
    <div className='App'>
      {/* <button onClick={downloadTimesheet} style={{ fontSize: 60 }}>
        Download Timesheet
      </button> */}
      <ThemeProvider theme={createTheme(theme ? light : dark)}>
        <Box m={4}>
          <Dashboard data={data} setTheme={setTheme} toggleIcon={icon} />
        </Box>
      </ThemeProvider>
    </div>
  );
}
