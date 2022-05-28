const notFound = require('../errors/notFound')
const router = require("express").Router();
const {list, post} = require("./tables.controller");

router.route("/").get(list).post(post).all(notFound);

module.exports = router;
