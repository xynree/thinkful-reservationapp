const service = require("./tables.service");
const { match } = require("../reservations/reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");


/* Validates Table POST */
const valTable = (req, res, next) => {
  const data = req.body.data;
  if (!data) return next({ status: 400, message: "Body is missing" });
  const fields = ["table_name", "capacity"];

  fields.forEach((field) => {
    if (!data[field] || data[field] === "")
      return next({ status: 400, message: `Missing field ${field}.` });
  });

  if (data.table_name.length === 1)
    return next({
      status: 400,
      message: "Body field table_name must be more than 1 character long.",
    });

  if (typeof data.capacity !== "number" || data.capacity === 0)
    return next({
      status: 400,
      message: `Body capacity must be a number greater than 0.`,
    });

  return next();
};

const valRes = async (req, res, next) => {
  if (!req.body.data)
    return next({
      status: 400,
      message: `Body field is missing.`,
    });

  const { reservation_id } = req.body.data;

  if (!reservation_id)
    return next({
      status: 400,
      message: `Body field reservation_id is missing.`,
    });

  const reservation = await match(reservation_id);

  if (!reservation)
    return next({
      status: 404,
      message: `${reservation_id} does not exist.`,
    });
  res.locals.reservation = reservation;

  return next();
};

const valCapacity = async (req, res, next) => {
  const { table_id } = req.params;
  const reservation = res.locals.reservation;

  const table = await service.read(table_id);

  if (table.reservation_id)
    return next({
      status: 400,
      message: `Table is occupied.`,
    });

  if (table.capacity < reservation.people)
    return next({
      status: 400,
      message: `Table has insufficient capacity.`,
    });

  res.locals.table = table;

  return next();
};

const valId = async (req, res, next) => {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (!table) return next({
    status: 404,
    message: `${table_id} is not found.`,
  });
  if (!table.reservation_id)
    return next({
      status: 400,
      message: `Table is not occupied.`,
  });
  res.locals.table_id = table_id;
  return next();
};

module.exports = {
  valTable,
  valCapacity: asyncErr(valCapacity),
  valRes: asyncErr(valRes),
  valId: asyncErr(valId),
};
