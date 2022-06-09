const notFound = require('../errors/notFound')

const router = require("express").Router();
const { list, match, post, changeStatus, update } = require("./reservations.controller");

router.route("/").get(list).post(post).all(notFound);
router.route("/:reservation_id").get(match).put(update).all(notFound)
router.route("/:reservation_id/status").put(changeStatus).all(notFound)

module.exports = router;
