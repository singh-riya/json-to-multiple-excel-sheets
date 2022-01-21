import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tHead: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const EnhancedTableHead = ({ orderBy, order, onRequestSort }) => {
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    console.log({ property, event });
    onRequestSort(event, property);
  };

  const columns = [
    {
      id: "date",
      label: "Date/Day",
    },
    {
      id: "feature",
      label: "Feature",
    },
    {
      id: "subject",
      label: "Subject",
    },
    {
      id: "hours",
      label: "Hours",
      numeric: true,
    },
    {
      id: "isLeave",
      label: "is on Leave?",
    },
    {
      id: "isHoliday",
      label: "is Holiday?",
    },
    {
      id: "isCompOff",
      label: "Eligible for comp off?",
    },
  ];

  return (
    <TableHead color='primary'>
      <TableRow>
        {columns.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant='h6' style={{ fontSize: "14px" }}>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
