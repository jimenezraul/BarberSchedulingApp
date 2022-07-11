module.exports = {
  //format date from 6/1/2020 to 01-06-2020
  formatDate: function (date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  },

  // format date and time in eastern timezone
  formatDateTime: function (date) {
   
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      dayOfWeekName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][d.getDay()],
      monthName = [
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

    (hourFormatted = hour % 12 || 12),
      (minuteFormatted = minute < 10 ? "0" + minute : minute),
      (morning = hour < 12 ? "AM" : "PM");

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return {
      date: `${dayOfWeekName} ${monthName} ${day}, ${year}`,
      time: [hourFormatted, minuteFormatted].join(":") + ` ${morning}`,
    };
  },

  decodedJwt: function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  },
};
