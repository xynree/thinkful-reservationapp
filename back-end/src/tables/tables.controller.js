const service = require("./tables.service");
const asyncErr = require("../errors/asyncErrBoundary");
const { valTable, valCapacity, valRes, valId } = require('./validateTables');

const list = async (req, res, next) => {
  const data = await service.list();
  if (!data) return next();
  return res.status(200).json({ data });
};

const post = async (req, res, next) => {
  const data = await service.create(req.body.data);
  if (!data) return next();
  return res.status(201).json({ data });
};

const put = async (req, res, next) => {
  const body = res.locals.table
  body.reservation_id = res.locals.reservation.reservation_id;
  const data = await service.seatRes(body);
  return res.status(200).json({data})
};

const del = async (req,res,next) => {
  await service.delSeat(res.locals.table_id)
  return res.status(200).json({data: []});
}

module.exports = {
  list: asyncErr(list),
  post: [valTable, asyncErr(post)],
  put: [valRes, valCapacity, asyncErr(put)],
  del: [valId, asyncErr(del)]
};
