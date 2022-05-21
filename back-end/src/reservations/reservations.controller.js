/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function post(req,res) {
  console.log(req.body.data)
}

module.exports = {
  list,
  post
};
