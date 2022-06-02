const service = require("./tables.service");
const asyncErr = require("../errors/asyncErrBoundary");

async function list(req, res, next) {
  const data = await service.list();
  if (!data) return next();
  return res.json({ data });
}

async function post(req, res, next) {

}

module.exports = {
  list: asyncErr(list),
  post: asyncErr(post),
};
