import React, { useEffect, useState } from "react";
import {
  checkboxFields,
  firstdayWeek,
  getDayName,
  getWeekRange,
  isWithinWeek,
  lastdayWeek,
  maxDateRange,
  minDateRange,
  transformData,
} from "../utils/utils";
import "./Dashboard.css";
import Pagination from "./Pagination";

const Dashboard = ({ data = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 7,
    total: data?.timesheet?.length || 0,
    rowsPerPage: [7, 10, 15, 30],
  });

  const [tableData, setTableData] = useState([]);
  const [dateState, setDateState] = useState({
    fromDate: "",
    toDate: "",
  });

  const setTablePagination = (prop, value) => {
    setPagination({ ...pagination, [prop]: value });
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

    const table = currentWeek ? sevenDays : updatedTimesheet;
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
  }, [data, pagination]);

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
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const filteredData = timesheet.filter((item) => {
      const dateObj = new Date(item.date);
      return dateObj >= fromDateObj && dateObj <= toDateObj;
    });
    setTableData(applySort(filteredData));
  };

  return (
    <div>
      <div>
        <h1>Timesheet Dashboard</h1>
      </div>

      <div className="sheet-btns">
        <div className="sheet-btns__left">
          <div className="sheet-btns__left__from">
            <label htmlFor="From">From:</label>
            <input
              type="date"
              id="From"
              name="fromDate"
              min={minDateRange.toString()}
              value={dateState.fromDate}
              max={dateState.toDate || maxDateRange.toString()}
              onChange={handleDateChange}
            />
          </div>
          <div className="sheet-btns__left__to">
            <label htmlFor="To">To:</label>
            <input
              type="date"
              id="To"
              name="toDate"
              value={dateState.toDate}
              min={dateState.fromDate}
              max={maxDateRange.toString()}
              onChange={handleDateChange}
            />
          </div>
          <div className="sheet-btns__left__show-sheet-btn">
            <button type="button" onClick={() => loadData(true)}>
              Clear filter
            </button>
            <button type="button" onClick={applyDateFilter}>
              Show Sheet
            </button>
            <button onClick={() => loadData(false, true)}>Current Week</button>
          </div>
        </div>

        <div className="sheet-btns__right">
          <button>Unlock Sheet</button>
        </div>
      </div>

      <div className="sheet-container">
        <div className="sheet-container__header">
          <div className="sheet-container__header__h3">
            <h3>
              Weekly Timesheet
              {/* Weekly Timesheet ({firstdayWeek}&nbsp;-&nbsp;{lastdayWeek}) */}
            </h3>
          </div>
          <div className="sheet-container__header__download-btn">
            <button disabled={!isEditing} onClick={handleSave}>
              Save
            </button>
            <button>Download sheet</button>
          </div>
        </div>

        <div className="sheet-container__header__table">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Date/Day</th>
                  <th>Feature</th>
                  <th>Subject</th>
                  <th>Hours</th>
                  <th>is on Leave?</th>
                  <th>is Holiday?</th>
                  <th>Eligible for comp off?</th>
                </tr>
              </thead>
              <tbody>
                {(tableData || [])
                  .slice(
                    (pagination.currentPage - 1) * pagination.pageSize,
                    pagination.currentPage * pagination.pageSize
                  )
                  .map((item) => {
                    const {
                      date = new Date(),
                      feature = "",
                      subject = "",
                      hours = 0,
                      isLeave = false,
                      isHoliday = false,
                      isWeekend = false,
                      isCompOff = false,
                    } = item || {};

                    return (
                      <tr
                        key={date}
                        className={isWeekend ? "weekend-row" : "table-row"}
                      >
                        <td>{`${date} | ${getDayName(date)}`}</td>
                        <td>
                          <textarea
                            rows="2"
                            multiple
                            placeholder="Enter feature"
                            disabled={!isWithinWeek(date) || isLeave}
                            name="feature"
                            onChange={(event) => handleChange(event, date)}
                            value={feature}
                          />
                        </td>
                        <td>
                          <textarea
                            rows="2"
                            type="text"
                            multiple
                            placeholder="Enter subject"
                            disabled={!isWithinWeek(date) || isLeave}
                            name="subject"
                            onChange={(event) => handleChange(event, date)}
                            value={subject}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            disabled={!isWithinWeek(date) || isLeave}
                            name="hours"
                            onChange={(event) => handleChange(event, date)}
                            value={hours}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            disabled={!isWithinWeek(date)}
                            name="isLeave"
                            checked={isLeave}
                            onChange={(event) => handleChange(event, date)}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            disabled={!isWithinWeek(date)}
                            name="isHoliday"
                            checked={isHoliday}
                            onChange={(event) => handleChange(event, date)}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            disabled={
                              !isHoliday || isLeave || !isWithinWeek(date)
                            }
                            name="isCompOff"
                            onChange={(event) => handleChange(event, date)}
                            checked={isCompOff}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination {...pagination} setTablePagination={setTablePagination} />
    </div>
  );
};

export default Dashboard;
