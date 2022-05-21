const service = require('./reservations.service')
const asyncErr = require('../errors/asyncErrBoundary')


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  if (!req.query.date) return next({status: 400, message: `Date is not found.`});
 
  const data = await service.read(req.query.date)
  return res.json({data})
}

async function post(req,res) {
  console.log(req.searchParams)
}

module.exports = {
  list: asyncErr(list),
  post: asyncErr(post)
};
