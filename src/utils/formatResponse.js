const momentTz = require("moment-timezone");
// const { USER_TYPE, DATE_FORMAT } = require("../config/appConstants");

const localtime = (DateTime, timeZone) => {
  const localDt = momentTz
    .tz(DateTime, timeZone)
    .format("dddd Do MMMM YYYY, HH:mm:ss a");

  return localDt;
};

// const utcTime = (DateTime, timeZone) => {
//   const utctime =
//     momentTz.tz(DateTime, timeZone).utc().format("YYYY-MM-DD T HH:mm:ss") + "Z";
//   return new Date(utctime);
// };

const formatData = (userData, timezone) => {
  delete userData.__v;
  userData.createdAt = localtime(userData.createdAt, timezone);
  if (userData.updatedAt) {
    userData.updatedAt = localtime(userData.updatedAt, timezone);
  }
  return userData;
};


module.exports = { localtime, formatData };
