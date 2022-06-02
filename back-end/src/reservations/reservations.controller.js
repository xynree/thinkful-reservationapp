const service = require("./reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

const CLOSEDDOW = 1
const REST_HRS = {open: {hr: 10, min: 30}, close: {hr: 21, min: 30}}

function isBetweenTimes(time, hrs) {
  const [hours, mins] = time.split(":")
  const currentTime = new Date();
  currentTime.setHours(hours);
  currentTime.setMinutes(mins);

  const startTime = new Date();
  startTime.setHours(hrs.open.hr)
  startTime.setMinutes(hrs.open.min)

  const endTime = new Date();
  endTime.setHours(hrs.close.hr)
  endTime.setMinutes(hrs.close.min)

  return ((currentTime > startTime) && (currentTime < endTime))
}

/** Validates Date */
const valDate = (req,res,next) => {
  const today = new Date();
  const checkDate = new Date(req.body.data.reservation_date);

  if (today > checkDate) return next({ status: 400, message: `Reservation date must be in the future.` });
  if (checkDate.getDay() === CLOSEDDOW) return next({ status: 400, message: `Restaurant is closed on Tuesdays.` });
  if (!isBetweenTimes(req.body.data.reservation_time, REST_HRS)) return next({ status: 400, message: `Restaurant is only open for booking between ${REST_HRS.open.hr}:${REST_HRS.open.min} AM and ${REST_HRS.close.hr-12}:${REST_HRS.close.min} PM. `});

  return next();
}


/** Validates Reservation before POST */
const valRes = (req, res, next) => {
  const data = req.body.data;

  if (!data) return next({ status: 400, message: `Invalid body.` });

  [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ].forEach((field) => {
    if (!data[field] || data[field] === '')
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

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  if (!req.query.date)
    return next({ status: 400, message: `Date is not found.` });
  const data = await service.read(req.query.date);
  return res.json({ data });
}

async function match(req, res, next) {
  const data = await service.match(Number(req.params.reservation_Id));
  if (!data) return next({ status: 400, message: `Reservation by that id not found.` })
  return res.status(200).json({ data: data[0] });
}

async function post(req, res, next) {
  const data = await service.create(req.body.data);
  return res.status(201).json({ data });
}

module.exports = {
  list: asyncErr(list),
  match: asyncErr(match),
  post: [valRes, valDate,  asyncErr(post)],
};
