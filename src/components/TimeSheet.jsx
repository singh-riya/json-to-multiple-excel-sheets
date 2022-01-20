import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  getDayName,
  isWithinWeek,
} from "../utils/utils";
import Pagination from "./Pagination";

const TimeSheet = ({tableData, handleChange, isEditing, handleSave, pagination, unlock, setTablePagination}) => {
  return (
    <Grid container spacing={2} className="sheet-container">
          <Grid item className="sheet-container__header">
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item >
              <Typography fontWeight={600} >
                Weekly Timesheet
                {/* Weekly Timesheet ({firstdayWeek}&nbsp;-&nbsp;{lastdayWeek}) */}
              </Typography>
            </Grid>
            <Grid item >
              <Button variant="contained" disabled={!isEditing} onClick={handleSave}>
                Save
              </Button>
            </Grid>
            </Grid>
          </Grid>

          <Grid item className="sheet-container__header__table">
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
                          className={(`${getDayName(date)}` === 'Sunday') ? "weekend-row" : "table-row" && (`${getDayName(date)}` === 'Saturday') ? "weekend-row" : "table-row"}
                        >
                          <td>{`${date} | ${getDayName(date)}`}</td>
                          <td>
                            <textarea
                              rows="2"
                              multiple
                              placeholder="Enter feature"
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
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
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
                              name="subject"
                              onChange={(event) => handleChange(event, date)}
                              value={subject}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
                              name="hours"
                              onChange={(event) => handleChange(event, date)}
                              value={hours}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              disabled={unlock ? false : !isWithinWeek(date)}
                              name="isLeave"
                              checked={isLeave}
                              onChange={(event) => handleChange(event, date)}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              disabled={unlock ? false : !isWithinWeek(date)}
                              name="isHoliday"
                              checked={isHoliday}
                              onChange={(event) => handleChange(event, date)}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              disabled={
                                unlock ? false : !isHoliday || isLeave || !isWithinWeek(date)
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
          </Grid>
          <Pagination {...pagination} setTablePagination={setTablePagination} />
        </Grid>
  );
};

export default TimeSheet;
