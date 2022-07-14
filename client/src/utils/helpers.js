export function pastdate({ date, view }) {
  if (view === "month") {
    if (date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2) {
      return true;
    }
    const holyday = new Date("12/25/21");
    let d = new Date();

    if (dateInPast(date, d)) {
      return true;
    } else {
      if (date.setHours(0, 0, 0, 0) === holyday.setHours(0, 0, 0, 0)) {
        return true;
      }
      return false;
    }
  }
}

export const dateInPast = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

export const formatDate = function (date) {
  // format dat to Wednesday, June 1, 2020
  const d = new Date(date);
  const dayOfWeekName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][d.getDay()];
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][d.getMonth()];
  return [dayOfWeekName, monthName, d.getDate(), d.getFullYear()];
};

export function formattedDate(date) {
  date = date.split("/");
  if (date[0] < 10) {
    date[0] = "0" + date[0];
  }
  if (date[1] < 10) {
    date[1] = "0" + date[1];
  }
  return `${date[1]}/${date[0]}/${date[2]}`;
}

export function militaryToStandard(time) {
  let hour = time.split(".")[0];
  let minute = time.split(".")[1];
  let morning = "AM";

  if (hour === "12") {
    morning = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
    morning = "PM";
  }
  return [hour, minute].join(":") + morning;
}

export function formatDateToSetmore(date, time) {
  let d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let hour = time.split(".")[0];
  let minute = time.split(".")[1];

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  let newDate = `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;
  let start_time = new Date(newDate);
  start_time = start_time.toISOString();
  let end_time = new Date(start_time);
  // add 30 minutes to the end time
  end_time.setMinutes(end_time.getMinutes() + 30);
  end_time = end_time.toISOString();
  return [start_time, end_time];
}
