const service = require("./reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");
const {
  valBody,
  valDate,
  valFields,
  valStatus,
  valResId,
} = require("./validateReservations");

const list = async (req, res, next) => {
  if (req.query.mobile_number) {
    const { mobile_number } = req.query;

    const data = await service.listByNum(mobile_number);
    console.log(data)
    if (!data)
      return next({ status: 400, message: `No reservations found.` });
    return res.status(200).json({ data });
  }

  if (!req.query.date)
    return next({ status: 400, message: `Date is not found.` });
  const data = await service.read(req.query.date);
  const unfinished = data.filter(({ status }) => status !== "finished");
  return res.json({ data: unfinished });
};

const match = async (req, res, next) => {
  const data = await service.match(Number(req.params.reservation_id));
  if (!data)
    return next({ status: 400, message: `Reservation by that id not found.` });
  return res.status(200).json({ data });
};

const post = async (req, res, next) => {
  const body = { ...req.body.data, status: "booked" };
  const data = await service.create(body);
  if (!data)
    return next({ status: 400, message: `New reservation unsuccessful.` });
  return res.status(201).json({ data });
};

const changeStatus = async (req, res, next) => {
  const data = await service.changeStatus(
    Number(req.params.reservation_id),
    req.body.data.status
  );
  return res.status(200).json({ data });
};

module.exports = {
  list: asyncErr(list),
  match: asyncErr(match),
  post: [valBody, valFields, valStatus, valDate, asyncErr(post)],
  changeStatus: [valBody, valStatus, valResId, asyncErr(changeStatus)],
};
