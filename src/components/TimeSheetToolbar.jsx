import { Grid, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { maxDateRange, minDateRange } from "../utils/utils";
import MuiButton from "@mui/material/Button";
import {withStyles} from "@mui/styles";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Button = withStyles({
  root: {
    padding: "-10px",
  },
})(MuiButton);

const TimeSheetToolbar = ({
  loadData,
  dateState,
  // handleDateChange,
  applyDateFilter,
  handleUnlock,
  unlock,
  setDateState
}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleFromDateChange = (e) => {
    console.log({e});
    setDateState({ ...dateState, "fromDate": e });
    setFromDate(e);
  };

  const handleToDateChange = (e) => {
    console.log({e});
    setDateState({ ...dateState, "toDate": e });
    setToDate(e);
  };
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
              
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item>
                <KeyboardDatePicker
                  id='From'
                  value={fromDate}
                  mindate={minDateRange.toString()}
                  maxdate={ maxDateRange.toString()}
                  onChange={handleFromDateChange}
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  disableFuture
                />
              </Grid>
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item>
                <KeyboardDatePicker
                  id='To'
                  name='toDate'
                  value={toDate}
                  onChange={handleToDateChange}
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  disableFuture
                />
              </Grid>
              </MuiPickersUtilsProvider>


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
                >
                  Clear <FilterAltOffIcon />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  type='button'
                  onClick={applyDateFilter}
                  size='small'
                  disabled={!dateState.fromDate || !dateState.toDate}
                >
                  Show  <FilterAltIcon />
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                  variant='contained'
                  onClick={() => loadData(false, true)}
                  size='small'
                >
                  Current Week
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Tooltip title={unlock ? 'Unlock' : 'Lock'} arrow >
            <IconButton variant='contained' onClick={handleUnlock} size='small' >
              {unlock ? <LockOpenIcon color='error' fontSize="large" /> : <LockIcon color='warning' fontSize="large" />}
            </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title='Download Sheet' arrow >
            <IconButton variant='contained' size='small'><SimCardDownloadIcon color='success' fontSize="large" /></IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TimeSheetToolbar;
