const knex = require('../db/connection')
const table = "tables"

const list = () => {
  return knex(table).select("*").then(data=> data.sort((prev,curr)=> prev.table_name < curr.table_name? -1:1))
}

const read = (id) => {
  return knex(table).select("*").where({"table_id": id}).then(tbl => tbl[0])
}

const create = (tbl) => {
  return knex(table).insert(tbl).returning("*").then(tables => tables[0])
}

const seatRes = (body) => {
  return knex(table)
  .where({table_id : body.table_id})
  .update(body)
  .returning("*").then(tbl => tbl[0])
}

module.exports = {
  list,
  read, 
  create,
  seatRes
}