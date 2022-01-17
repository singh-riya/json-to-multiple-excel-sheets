export const checkboxFields = [
  "isLeave",
  "isHoliday",
  "isCompOff",
  "isWeekend",
];

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
  curr.setDate(curr.getDate() - curr.getDay())
)
  .toISOString()
  .slice(0, 10);
export const lastdayWeek = new Date(
  curr.setDate(curr.getDate() - curr.getDay() + 6)
)
  .toISOString()
  .slice(0, 10);
