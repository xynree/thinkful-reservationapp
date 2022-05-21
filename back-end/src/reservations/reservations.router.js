/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const {list, post} = require("./reservations.controller");

router.route("/").get(list).post(post);

module.exports = router;
