import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { maxDateRange, minDateRange } from "../utils/utils";
import MuiButton from "@mui/material/Button";
import {withStyles} from "@mui/styles";

const Button = withStyles({
  root: {
    // color: "white",
    // backgroundColor: "#3f51b5",
    // "&:hover": {
    //   backgroundColor: "#3f51b5",
    // },
    padding: "-10px",
  },
})(MuiButton);

const TimeSheetToolbar = ({
  loadData,
  dateState,
  handleDateChange,
  applyDateFilter,
  handleUnlock,
  unlock,
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
                <TextField
                  label='From Date'
                  id='From'
                  type='date'
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='fromDate'
                  value={dateState.fromDate}
                  mindate={minDateRange.toString()}
                  maxdate={dateState.toDate || maxDateRange.toString()}
                  onChange={handleDateChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  label='To Date'
                  type='date'
                  id='To'
                  name='toDate'
                  value={dateState.toDate}
                  min={dateState.fromDate}
                  max={maxDateRange.toString()}
                  onChange={handleDateChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
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
                >
                  Clear filter
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  type='button'
                  onClick={applyDateFilter}
                >
                  Show Sheet
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => loadData(false, true)}
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
            <Button variant='contained' type='button' onClick={handleUnlock}>
              {unlock ? "Lock Sheet" : "Unlock Sheet"}
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained'>Download sheet</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TimeSheetToolbar;
