import React from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const EnhancedTableHead = ({ orderBy, order, onRequestSort }) => {
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
  ]

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6">{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
