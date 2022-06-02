const service = require("./tables.service");
const asyncErr = require("../errors/asyncErrBoundary");

/* Validates Table */
const valTable = (req, res, next) => {
  const data = req.body.data;
  if (!data) return next({ status: 400, message: "Body is missing" });
  const fields = ['table_name', 'capacity'];

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

async function list(req, res, next) {
  const data = await service.list();
  if (!data) return next();
  return res.status(200).json({ data });
}

async function post(req, res, next) {
  const data = await service.create(req.body.data);
  if (!data) return next();
  return res.status(201).json({ data });
}

async function put(req, res, next) {
  const data = await service.create(req.body.data);
  if (!data) return next();
  return res.status(201).json({ data });
}

module.exports = {
  list: asyncErr(list),
  post: [valTable, asyncErr(post)],
  put: asyncErr(put)
};
