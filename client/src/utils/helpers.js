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
