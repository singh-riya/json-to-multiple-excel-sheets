
import { Button, Checkbox, Grid, Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  getComparator,
  getDayName,
  isWithinWeek,
} from "../utils/utils";
import EnhancedTableHead from './EnhancedTableHead';
import Pagination from "./Pagination";

const TimeSheet = ({tableData, handleChange, isEditing, handleSave, pagination, unlock, setTablePagination}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
            <TableContainer sx={{ maxHeight: 800 }}>
              <Table stickyHeader aria-label="sticky table">
              <EnhancedTableHead
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  {(tableData || [])
                    .slice(
                      (pagination.currentPage - 1) * pagination.pageSize,
                      pagination.currentPage * pagination.pageSize
                    )
                    .sort(getComparator(order, orderBy))
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
                        <TableRow
                          key={date}
                          className={(`${getDayName(date)}` === 'Sunday') ? "weekend-row" : "table-row" && (`${getDayName(date)}` === 'Saturday') ? "weekend-row" : "table-row"}
                        >
                          <TableCell>{`${date} | ${getDayName(date)}`}</TableCell>
                          <TableCell>
                            <TextField
                              multiline
                              placeholder="Enter feature"
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
                              name="feature"
                              onChange={(event) => handleChange(event, date)}
                              value={feature}
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              multiline
                              placeholder="Enter subject"
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
                              name="subject"
                              onChange={(event) => handleChange(event, date)}
                              value={subject}
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              placeholder="Enter hours"
                              type="number"
                              disabled={unlock ? false : !isWithinWeek(date) || isLeave}
                              name="hours"
                              onChange={(event) => {
                                if (event.target.value > 0 && event.target.value < 11) {
                                  handleChange(event, date);
                                } 
                              }}
                              value={hours}
                              variant="standard"
                              style={{ maxWidth: "fit-content" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              type="checkbox"
                              disabled={unlock ? false : !isWithinWeek(date)}
                              name="isLeave"
                              checked={isLeave}
                              onChange={(event) => handleChange(event, date)}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              type="checkbox"
                              disabled={unlock ? false : !isWithinWeek(date)}
                              name="isHoliday"
                              checked={isHoliday}
                              onChange={(event) => handleChange(event, date)}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              type="checkbox"
                              disabled={
                                unlock ? false : !isHoliday || isLeave || !isWithinWeek(date)
                              }
                              name="isCompOff"
                              onChange={(event) => handleChange(event, date)}
                              checked={isCompOff}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Pagination {...pagination} setTablePagination={setTablePagination} /> */}
          <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={pagination.total}
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.currentPage}
              onPageChange={setTablePagination}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
  );
};

export default TimeSheet;
