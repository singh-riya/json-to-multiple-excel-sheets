import { Grid, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { maxDateRange, minDateRange } from "../utils/utils";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Button = withStyles({
  root: {
    padding: "-10px",
  },
})(MuiButton);

const TimeSheetToolbar = ({
  loadData,
  dateState,
  applyDateFilter,
  handleUnlock,
  unlock,
  handleDateChange,
  toggleIcon,
  setTheme,
}) => {
  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Grid
              container
              alignItems='center'
              spacing={2}
              justifyContent='center'
            >
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    clearable
                    value={dateState.fromDate}
                    mindate={minDateRange.toString()}
                    maxdate={maxDateRange.toString()}
                    onChange={(date) => handleDateChange("fromDate", date)}
                    inputVariant='outlined'
                    format='MM/dd/yyyy'
                    disableFuture
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    clearable
                    value={dateState.toDate}
                    onChange={(date) => handleDateChange("toDate", date)}
                    inputVariant='outlined'
                    format='MM/dd/yyyy'
                    disableFuture
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              alignItems='center'
              spacing={2}
              justifyContent='center'
            >
              <Grid item>
                <Button
                  variant='contained'
                  type='button'
                  onClick={() => loadData(true)}
                  size='small'
                  disabled={!dateState.fromDate || !dateState.toDate}
                  color='primary'
                >
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  type='button'
                  onClick={applyDateFilter}
                  size='small'
                  disabled={!dateState.fromDate || !dateState.toDate}
                  color='primary'
                >
                  Show
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => loadData(false, true)}
                  size='small'
                  color='primary'
                >
                  Current Week
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Tooltip title={unlock ? "Unlock" : "Lock"} arrow>
              <IconButton
                variant='contained'
                onClick={handleUnlock}
                size='small'
              >
                {unlock ? (
                  <LockOpenIcon color='error' fontSize='large' />
                ) : (
                  <LockIcon color='warning' fontSize='large' />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title='Download Sheet' arrow>
              <IconButton variant='contained' size='small'>
                <GetAppIcon color='primary' fontSize='large' />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title='Switch theme' arrow>
              <IconButton
                edge='end'
                color='inherit'
                aria-label='mode'
                onClick={() => setTheme((prev) => !prev)}
              >
                {toggleIcon}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TimeSheetToolbar;
