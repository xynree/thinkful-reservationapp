const knex = require('../db/connection')
const table = "reservations"

const read = (date) => {
  return knex(table).select("*").where({"reservation_date": date}).then((data) => data.sort((prev,curr) => prev.reservation_time < curr.reservation_time? -1:1))
}


module.exports = {
  read
}