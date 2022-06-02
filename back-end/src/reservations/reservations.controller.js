const service = require("./reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");
const { valDate, valRes } = require('./validateReservations');

async function list(req, res, next) {
  if (!req.query.date)
    return next({ status: 400, message: `Date is not found.` });
  const data = await service.read(req.query.date);
  return res.json({ data });
}

async function match(req, res, next) {
  const data = await service.match(Number(req.params.reservation_Id));
  if (!data) return next({ status: 400, message: `Reservation by that id not found.` })
  return res.status(200).json({ data });
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
