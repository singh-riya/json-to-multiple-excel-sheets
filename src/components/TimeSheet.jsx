import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import {
  firstdayWeek,
  getComparator,
  getDayName,
  isWithinWeek,
  lastdayWeek,
} from "../utils/utils";
import EnhancedTableHead from "./EnhancedTableHead";

const useStyles = makeStyles((theme) => ({
  todayRow: {
    backgroundColor: theme.palette.secondary.main,
  },
  weekendRow: {
    backgroundColor: theme.palette.primary.grey,
  },
  normalRow: {
    backgroundColor: theme.palette.secondary.white,
  },
}));

const TimeSheet = ({
  tableData,
  handleChange,
  isEditing,
  handleSave,
  pagination,
  unlock,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const classes = useStyles();

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Grid
          container
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Typography>
              {isWithinWeek(new Date())
                ? ` Weekly Timesheet (${firstdayWeek} to ${lastdayWeek})`
                : "Past Weeks"}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              disabled={!isEditing}
              onClick={handleSave}
              size='small'
              color='primary'
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label='sticky table'>
            <EnhancedTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {(tableData || [])
                .slice(
                  pagination.currentPage * pagination.pageSize,
                  (pagination.currentPage + 1) * pagination.pageSize
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
                    isCompOff = false,
                  } = item || {};

                  return (
                    <TableRow
                      key={date}
                      className={
                        getDayName(date) === "Sunday" ||
                        getDayName(date) === "Saturday"
                          ? classes.weekendRow
                          : classes.normalRow
                      }
                    >
                      <TableCell>{`${date} | ${getDayName(date)}`}</TableCell>
                      <TableCell>
                        <TextField
                          multiline
                          placeholder='Enter feature'
                          disabled={
                            unlock ? false : !isWithinWeek(date) || isLeave
                          }
                          name='feature'
                          onChange={(event) => handleChange(event, date)}
                          value={feature}
                          variant='standard'
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type='text'
                          multiline
                          placeholder='Enter subject'
                          disabled={
                            unlock ? false : !isWithinWeek(date) || isLeave
                          }
                          name='subject'
                          onChange={(event) => handleChange(event, date)}
                          value={subject}
                          variant='standard'
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          placeholder='Enter hours'
                          type='number'
                          disabled={
                            unlock ? false : !isWithinWeek(date) || isLeave
                          }
                          name='hours'
                          onChange={(event) => {
                            if (
                              event.target.value > 0 &&
                              event.target.value < 11
                            ) {
                              handleChange(event, date);
                            }
                          }}
                          value={hours}
                          variant='standard'
                          style={{ maxWidth: "fit-content" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          type='checkbox'
                          disabled={
                            unlock
                              ? isHoliday
                              : !isWithinWeek(date) || isHoliday
                          }
                          name='isLeave'
                          checked={isLeave}
                          onChange={(event) => handleChange(event, date)}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          type='checkbox'
                          disabled={
                            unlock ? isLeave : !isWithinWeek(date) || isLeave
                          }
                          name='isHoliday'
                          checked={isHoliday}
                          onChange={(event) => handleChange(event, date)}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          type='checkbox'
                          disabled={isHoliday ? false : true}
                          name='isCompOff'
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
      <TablePagination
        rowsPerPageOptions={[pagination.pageSize, 10, 25, 100]}
        component='div'
        count={tableData?.length || 0}
        rowsPerPage={pagination.pageSize}
        page={pagination.currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
  );
};

export default TimeSheet;
