import express from "express";
import XlsPopulate from "xlsx-populate";
import mockData from "./data/mockData.js";
import cors from "cors";
const app = express();
app.use(cors());

const headCell = [
  { column: "A", width: 15, text: "Sr No." },
  { column: "B", width: 15, text: "Date" },
  { column: "C", width: 15, text: "Feature" },
  { column: "D", width: 50, text: "Subject" },
  { column: "E", width: 10, text: "Hours" },
];

const addStyles = (sheet, index, isWeekend, isHoliday, onLeave) => {
  headCell.forEach(({ column, width }) => {
    sheet.column(column).width(width);
    sheet.cell(column + index).style("border", true);
    sheet.cell(column + "1").style("fill", "4472c4"); // fill header (first row) background color

    if (isWeekend) {
      sheet.cell(column + index).style("fill", "FFA500");
    }

    if (isHoliday || onLeave) {
      sheet.cell(column + index).style("fill", "FFD700");
    }
  });
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

app.get("/timesheet/download", async (req, res) => {
  const workbook = await XlsPopulate.fromBlankAsync();

  mockData.forEach((person) => {
    const ws = workbook.addSheet(capitalize(person.name));

    headCell.forEach(({ column, text }) => {
      ws.cell(column + "1")
        .value(capitalize(text))
        .style("bold", true);
    });
    addStyles(ws, 1);

    person.timesheet
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .forEach((ts, i) => {
        const { date, feature, subject, hours, isWeekend, isHoliday, onLeave } =
          ts;
        ws.cell(`A${i + 2}`).value(i + 1);
        ws.cell(`B${i + 2}`).value(date);
        ws.cell(`C${i + 2}`).value(feature);
        ws.cell(`D${i + 2}`).value(subject);
        ws.cell(`E${i + 2}`).value(hours);

        addStyles(ws, i + 2, isWeekend, isHoliday, onLeave);
      });
  });

  workbook.sheet(0).delete(); // delete default sheet

  const blob = await workbook.outputAsync();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=Timesheet.xlsx");
  res.send(blob);
});

app.get("/timesheet", (req, res) => {
  const { user } = req.query;
  const result = mockData.find((person) => (person?.id) === parseInt(user));
  console.log({user})
  console.log({result})
  res.json(result);
})

app.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
