import { Grid, Paper, Divider, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkboxFields, isWithinWeek, transformData } from "../utils/utils";
import "./Dashboard.css";
import TimeSheet from "./TimeSheet";
import TimeSheetToolbar from "./TimeSheetToolbar";

const Dashboard = ({ data = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 7,
  });

  const [tableData, setTableData] = useState([]);
  const [dateState, setDateState] = useState({
    fromDate: "",
    toDate: "",
  });

  const setTablePagination = (prop, value) => {
    setPagination({ ...pagination, [prop]: value });
  };

  const handleChangePage = (_event, newPage) => {
    setTablePagination("currentPage", newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setTablePagination("pageSize", parseInt(event.target.value, 10));
  };

  const applySort = (table) => {
    let sortedTable = [...table];
    sortedTable.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return sortedTable;
  };

  const loadData = (clearFilter, currentWeek = false) => {
    const { timesheet = [] } = data;
    const updatedTimesheet = transformData(timesheet);

    const sevenDays = updatedTimesheet.filter(
      (item) => isWithinWeek(item?.date) && item
    );

    const table = currentWeek ? updatedTimesheet : sevenDays;
    setTableData(applySort(table));

    if (clearFilter) {
      setDateState({
        fromDate: "",
        toDate: "",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [data]);

  const handleSave = () => {
    console.log({ tableData });
  };

  const handleChange = (event, date) => {
    const { name, value, checked } = event.target;
    const newTableData = [...tableData];
    const index = newTableData.findIndex((item) => item?.date === date);
    if (checkboxFields.includes(name)) {
      newTableData[index][name] = checked;
    } else {
      newTableData[index][name] = value;
    }
    if (newTableData !== tableData) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    setTableData(newTableData);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateState({ ...dateState, [name]: value });
  };

  const applyDateFilter = (e) => {
    e.preventDefault();
    const { fromDate, toDate } = dateState;
    const { timesheet = [] } = data;
    const fromDateObj = new Date(fromDate).setDate(
      new Date(fromDate).getDate() - 1
    );
    const toDateObj = new Date(toDate);
    const filteredData = timesheet.filter((item) => {
      const dateObj = new Date(item.date);
      return dateObj >= fromDateObj && dateObj <= toDateObj;
    });
    setTableData(applySort(filteredData));
  };

  const handleUnlock = () => {
    setUnlock((prev) => !prev);
    console.log({ unlock });
    setIsEditing((prev) => !prev);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Timesheet Dashboard</h1>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={24}>
        <Grid container justifyContent="center" alignItems="center" spacing={4} style={{padding: "20px"}}>
          <Grid item xs={12}>
            <TimeSheetToolbar
              loadData={loadData}
              dateState={dateState}
              // handleDateChange={handleDateChange}
              applyDateFilter={applyDateFilter}
              handleUnlock={handleUnlock}
              unlock={unlock}
              setDateState={setDateState}
            />
            <Divider style={{padding: '10px'}}/>
          </Grid>

          <Grid item xs={12}>
            <TimeSheet
              tableData={tableData}
              handleChange={handleChange}
              isEditing={isEditing}
              handleSave={handleSave}
              unlock={unlock}
              pagination={pagination}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              setTablePagination={setTablePagination}
              totalCount={data?.timesheet?.length}
            />
          </Grid>
        </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
