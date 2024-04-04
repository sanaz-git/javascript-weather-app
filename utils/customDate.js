const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const getWeekDay = (data) => {
  return DAYS[new Date(data * 1000).getDay()];
};

export { getWeekDay };
