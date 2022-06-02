const notFound = require('../errors/notFound')
const router = require("express").Router();
const {list, post, put} = require("./tables.controller");

router.route("/").get(list).post(post).all(notFound);
router.route(/:table_id/seat).put(put).all(notFound);

module.exports = router;
