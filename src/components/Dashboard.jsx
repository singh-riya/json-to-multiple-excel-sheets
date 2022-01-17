import React, { useEffect, useState } from "react";
import {
  checkboxFields,
  firstdayWeek,
  getDayName,
  lastdayWeek,
  maxDateRange,
  minDateRange,
} from "../utils/utils";
import "./Dashboard.css";

const Dashboard = ({ data = {} }) => {
  const [isEditing] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [dateState, setDateState] = useState({
    fromDate: "",
    toDate: "",
  });

  const applySort = (table) => {
    let sortedTable = [...table];
    sortedTable.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return sortedTable;
  };

  useEffect(() => {
    const { timesheet = [] } = data;
    const sevenDays = timesheet.slice(0, 7);
    setTableData(applySort(sevenDays));
  }, [data]);

  const handleSave = () => {
    console.log({ tableData });
  };

  const handleChange = (event, index) => {
    const { name, value, checked } = event.target;
    const newTableData = [...tableData];
    if (checkboxFields.includes(name)) {
      newTableData[index][name] = checked;
    } else {
      newTableData[index][name] = value;
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
            <button type="button" onClick={applyDateFilter}>
              Show Sheet
            </button>
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
              Weekly Timesheet ({firstdayWeek}&nbsp;-&nbsp;{lastdayWeek})
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
                {(tableData || []).map((item, index) => {
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
                          disabled={isLeave || !isEditing}
                          name="feature"
                          onChange={(event) => handleChange(event, index)}
                          value={feature}
                        />
                      </td>
                      <td>
                        <textarea
                          rows="2"
                          type="text"
                          multiple
                          placeholder="Enter subject"
                          disabled={isLeave || !isEditing}
                          name="subject"
                          onChange={(event) => handleChange(event, index)}
                          value={subject}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          disabled={isLeave || !isEditing}
                          name="hours"
                          onChange={(event) => handleChange(event, index)}
                          value={hours}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled={!isEditing}
                          name="isLeave"
                          checked={isLeave}
                          onChange={(event) => handleChange(event, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled={!isEditing}
                          name="isHoliday"
                          checked={isHoliday}
                          onChange={(event) => handleChange(event, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled={isLeave || !isEditing}
                          name="isCompOff"
                          onChange={(event) => handleChange(event, index)}
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
    </div>
  );
};

export default Dashboard;
