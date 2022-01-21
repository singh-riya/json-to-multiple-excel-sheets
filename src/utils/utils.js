export const checkboxFields = [
  "isLeave",
  "isHoliday",
  "isCompOff",
  "isWeekend",
];

export const transformData = (data = []) => {
  return (
    data &&
    data.map((item) => {
      const { timesheet = [] } = item;
      const newTimesheet = timesheet.map((tItem) => {
        const { date = "", ...rest } = tItem;
        let transformedDate =
          typeof date === "string"
            ? new Date(date.replace(/-/g, "/"))
            : new Date(date);
        console.log({ transformedDate });
        return {
          date: transformedDate,
          ...rest,
        };
      });
      return {
        ...item,
        timesheet: newTimesheet,
      };
    })
  );
};

export const getDayName = (dateStr) => {
  const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      baseDate.toLocaleDateString(navigator.language, { weekday: "long" })
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  const day = new Date(dateStr).getDay();
  return weekDays[day - 1] ? weekDays[day - 1] : weekDays[day + 6];
};

// 3 Months
export const minDateRange = new Date(
  new Date().setMonth(new Date().getMonth() - 3)
)
  .toISOString()
  .split("T")[0];
export const maxDateRange = new Date(
  new Date().setDate(new Date().getDate() + 1)
)
  .toISOString()
  .slice(0, 10);

const curr = new Date();
export const firstdayWeek = new Date(
  curr.setDate(curr.getDate() - curr.getDay() + 1)
)
  .toISOString()
  .slice(0, 10);
export const lastdayWeek = new Date(
  curr.setDate(curr.getDate() - curr.getDay() + 7)
)
  .toISOString()
  .slice(0, 10);

export const getWeekRange = (dateStr = new Date()) => {
  const date = new Date(dateStr);
  const firstday = new Date(date.setDate(date.getDate() - date.getDay()));
  const lastday = new Date(date.setDate(date.getDate() - date.getDay() + 7));
  return {
    fromDate: firstday.toISOString().slice(0, 10),
    toDate: lastday.toISOString().slice(0, 10),
  };
};

export const isWithinWeek = (date = new Date()) => {
  const { fromDate, toDate } = getWeekRange();
  const fromActualDate = new Date(fromDate).setDate(new Date(fromDate).getDate() );
  const toActualDate = new Date(toDate).setDate(new Date(toDate).getDate() );
  return (
    new Date(date) >= new Date(fromActualDate) && new Date(date) <= new Date(toActualDate)
  );
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
