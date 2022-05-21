const service = require('./reservations.service')
const asyncErr = require('../errors/asyncErrBoundary')


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  if (req.query.date) {
    const data = await service.read(req.query.date)
    return res.json({data})
  } else next({status: 404, message: `Date is not found.`});
}

async function post(req,res) {
  console.log(req.searchParams)
}

module.exports = {
  list: asyncErr(list),
  post: asyncErr(post)
};
