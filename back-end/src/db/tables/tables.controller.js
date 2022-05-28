const service = require("./reservations.service");
const asyncErr = require("../errors/asyncErrBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {

  // const data = await service.read(req.query.date);
  // return res.json({ data });
}

async function post(req, res, next) {

}

module.exports = {
  list: asyncErr(list),
  post: asyncErr(post),
};
