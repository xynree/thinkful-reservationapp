const service = require('./reservations.service')


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.read(req.query.date)
  return res.json({data})
}

async function post(req,res) {
  console.log(req.searchParams)
}

module.exports = {
  list,
  post
};
