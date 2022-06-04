const notFound = require('../errors/notFound')

/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const { list, match, post, changeStatus } = require("./reservations.controller");

router.route("/").get(list).post(post).all(notFound);
router.route("/:reservation_id").get(match).all(notFound)
router.route("/:reservation_id/status").put(changeStatus).all(notFound)

module.exports = router;
