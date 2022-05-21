const knex = require('../db/connection')
const table = "reservations"

const read = (date) => {
  return knex(table).select("*").where({"reservation_date": date});
}


module.exports = {
  read
}