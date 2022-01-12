import express from "express";
import XlsPopulate from "xlsx-populate";
import mockData from "../src/data/mockData.js";
import fs from "fs";
import cors from "cors";
const app = express();
app.use(cors());

const headCell = ["A", "B", "C", "D", "E"];

const borderStyle = {
  style: "thin",
  color: {
    type: "pattern",
    pattern: "solid",
    foreground: {
      rgb: "FFA50000",
    },
    background: {
      theme: 1,
      tint: 1,
    },
  },
};

const addStyles = (workbook, index, isWeekend, isHoliday, onLeave) => {
  headCell.forEach((alpha) => {
    workbook.cell(alpha + index).style("border", {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle,
    });

    if (isWeekend) {
      workbook.cell(alpha + index).style("fill", {
        type: "pattern",
        pattern: "solid",
        foreground: {
          rgb: "FFA500",
        },
        background: {
          theme: 1,
          tint: 1,
        },
      });
    }

    if (isHoliday || onLeave) {
      workbook.cell(alpha + index).style("fill", {
        type: "pattern",
        pattern: "solid",
        foreground: {
          rgb: "FFD700",
        },
        background: {
          theme: 1,
          tint: 1,
        },
      });
    }
  });
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

app.get("/timesheet", async (req, res) => {
  fs.existsSync("Timesheet.xlsx") && fs.unlinkSync("Timesheet.xlsx");
  await XlsPopulate.fromBlankAsync().then(async (workbook) => {
    mockData.forEach((person) => {
      const ws = workbook.addSheet(capitalize(person.name));
      ws.cell("A1").value("Sr No.");
      ws.cell("B1").value("Date");
      ws.cell("C1").value("Feature");
      ws.cell("D1").value("Subject");
      ws.cell("E1").value("Hours");
      addStyles(ws, 1);

      person.timesheet.sort((a, b) =>
      a.date > b.date ? 1 : -1
    ).forEach((ts, i) => {
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

    await workbook.toFileAsync("Timesheet.xlsx");
  });
  const fileBase64 = fs.readFileSync("Timesheet.xlsx", {
    encoding: "base64",
  });

  res.json({
    message: "Timesheet.xlsx created",
    fileBase64,
  });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
