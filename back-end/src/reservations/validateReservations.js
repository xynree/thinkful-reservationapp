const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;
const service = require("./reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");
const CLOSEDDOW = 1;
const REST_HRS = { open: { hr: 10, min: 30 }, close: { hr: 21, min: 30 } };

function isBetweenTimes(time, hrs) {
  const [hours, mins] = time.split(":");
  const currentTime = new Date();
  currentTime.setHours(hours);
  currentTime.setMinutes(mins);

  const startTime = new Date();
  startTime.setHours(hrs.open.hr);
  startTime.setMinutes(hrs.open.min);

  const endTime = new Date();
  endTime.setHours(hrs.close.hr);
  endTime.setMinutes(hrs.close.min);

  return currentTime > startTime && currentTime < endTime;
}

/** Validates Date */
const valDate = (req, res, next) => {
  const today = new Date();
  const checkDate = new Date(req.body.data.reservation_date);

  if (today > checkDate)
    return next({
      status: 400,
      message: `Reservation date must be in the future.`,
    });
  if (checkDate.getDay() === CLOSEDDOW)
    return next({ status: 400, message: `Restaurant is closed on Tuesdays.` });
  if (!isBetweenTimes(req.body.data.reservation_time, REST_HRS))
    return next({
      status: 400,
      message: `Restaurant is only open for booking between ${
        REST_HRS.open.hr
      }:${REST_HRS.open.min} AM and ${REST_HRS.close.hr - 12}:${
        REST_HRS.close.min
      } PM. `,
    });

  return next();
};

const valBody = (req, res, next) => {
  const data = req.body.data;

  if (!data) return next({ status: 400, message: `Invalid body.` });
  return next();
};

/** Validates Reservation before POST */
const valFields = (req, res, next) => {
  const data = req.body.data;
  [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ].forEach((field) => {
    if (!data[field] || data[field] === "")
      return next({ status: 400, message: `Missing field ${field}.` });
  });

  if (!timeFormat.test(data.reservation_time))
    return next({ status: 400, message: "reservation_time field is invalid." });
  if (!dateFormat.test(data.reservation_date))
    return next({ status: 400, message: "reservation_date field is invalid." });
  if (!parseInt(data.people) || typeof data.people !== "number")
    return next({ status: 400, message: "people field must be a number." });

  return next();
};

const valStatus = (req, res, next) => {
  let body = req.body.data;
  const checkedStatuses = [];

  if (!body.status) body = { ...req.body.data, status: "booked" };

  if (
    body.status !== "seated" &&
    body.status !== "booked" &&
    body.status !== "finished"
  )
    return next({ status: 400, message: `Invalid status ${body.status}.` });

  if (req.method === "POST") checkedStatuses.push("seated", "finished");

  checkedStatuses.forEach((status) => {
    if (body.status === status)
      return next({ status: 400, message: `Status cannot be ${body.status}` });
  });

  return next();
};

const valResId = async (req, res, next) => {
  const { reservation_id } = req.params;
  
  console.log('validation for res id run')

  const reserv = await service.match(Number(reservation_id));
  if (!reserv)
    return next({
      status: 404,
      message: `There is no reservation with id ${reservation_id}.`,
    });
  if (reserv.status === "finished")
    return next({
      status: 400,
      message: "A finished reservation cannot be updated.",
    });

  return next();
};

module.exports = {
  valResId: asyncErr(valResId),
  valBody,
  valDate,
  valFields,
  valStatus,
};
