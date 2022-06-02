const notFound = require('../errors/notFound')
const router = require("express").Router();
const {list, post, put, del} = require("./tables.controller");

router.route("/").get(list).post(post).all(notFound);
router.route("/:table_id/seat").put(put).delete(del).all(notFound);

module.exports = router;
