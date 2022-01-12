import React from "react";
import * as xlsxPopulate from "xlsx-populate";
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
  xlsxPopulate.fromBlankAsync().then((workbook) => {
    mockData.forEach((person) => {
      const ws = workbook.addSheet(person.name);
      ws.cell("A1").value("Date");
      ws.cell("B1").value("Feature");
      ws.cell("C1").value("Subject");
      ws.cell("D1").value("Hours");

      person.timesheet.forEach((ts) => {
        const { date, feature, subject, hours, isWeekend, isHoliday } = ts;
        ws.cell("A2").value(date);
        ws.cell("B2").value(feature);
        ws.cell("C2").value(subject);
        ws.cell("D2").value(hours);

        if (isWeekend) {
          ws.cell("E2").value("isWeekend");
        }
        if (isHoliday) {
          ws.cell("F2").value("isHoliday");
        }

        ws.cell("A2").style({
          font: { bold: true },
        });
        ws.cell("B2").style({
          font: { bold: true },
        });
        ws.cell("C2").style({
          font: { bold: true },
        });
        ws.cell("D2").style({
          font: { bold: true },
        });
      });
    });
    workbook.saveAsBlob("Timesheet.xlsx");
  });
};

const XlsPopulate = () => {
  return <button onClick={exportToExcel}>Export Now!</button>;
};

export default XlsPopulate;
