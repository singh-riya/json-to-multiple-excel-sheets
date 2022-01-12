import React from "react";
import * as xlsx from "xlsx";
import mockData from "../data/mockData";

const transformDataIntoSheet = (data) => {
  const sheets = {};
  const sheetNames = [];
  data.forEach((obj) => {
    const { name, timesheet } = obj;
    const formattedName = name.toUpperCase();
    const arr = [];
    arr.push(["Date", "Feature", "Subject", "Hours", "isWeekend", "isHoliday"]);
    const sortedTimesheet = timesheet.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
    sortedTimesheet.forEach((ts) => {
      const { date, feature, subject, hours, isWeekend, isHoliday } = ts;
      arr.push([date, feature, subject, hours, isWeekend, isHoliday]);
    });
    sheets[formattedName] = arr;
    sheetNames.push(formattedName);
  });
  return { sheets, sheetNames };
};

const exportToExcel = () => {
  const { sheets, sheetNames } = transformDataIntoSheet(mockData);
  const wb = xlsx.utils.book_new();

  sheetNames.forEach((sheetName) => {
    const ws = xlsx.utils.aoa_to_sheet(sheets[sheetName]);

    // colour cells of sheet
    const range = xlsx.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = ws[xlsx.utils.encode_cell({ r: R, c: C })];
        if (cell) {
          if (cell.v === "isWeekend") {
            console.log({ cell });
            cell.s = {
              fill: {
                bgColor: { rgb: "FF0000" },
              },
            };
          }
        }
      }
    }

    // bold cell
    const boldRange = xlsx.utils.decode_range(ws["!ref"]);
    for (let R = boldRange.s.r; R <= boldRange.e.r; ++R) {
      for (let C = boldRange.s.c; C <= boldRange.e.c; ++C) {
        const cell = ws[xlsx.utils.encode_cell({ r: R, c: C })];
        if (cell) {
          if (cell.v === "Date") {
            cell.s = {
              font: { bold: true },
            };
          }
        }
      }
    }

    xlsx.utils.book_append_sheet(wb, ws, sheetName);
  });

  console.log({ wb });

  xlsx.writeFile(wb, "timesheet.xlsx");
};

const XlsDoc = () => {
  return <button onClick={exportToExcel}>Export Now!</button>;
};

export default XlsDoc;
