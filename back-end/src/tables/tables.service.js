const knex = require('../db/connection')
const table = "tables"

const list = () => {
  return knex(table).select("*").then(data=> data.sort((prev,curr)=> prev.table_name < curr.table_name? -1:1))
}

const create = (tbl) => {
  return knex(table).insert(tbl).returning("*").then(tables => tables[0])
}

const read = (date) => {
  // return knex(table).select("*").where({"reservation_date": date}).then((data) => data.sort((prev,curr) => prev.reservation_time < curr.reservation_time? -1:1))
}



module.exports = {
  list,
  read, 
  create
}