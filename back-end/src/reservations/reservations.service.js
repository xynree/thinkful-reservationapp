const knex = require('../db/connection')
const table = "reservations"


const read = (date) => {
  return knex(table).select("*").where({"reservation_date": date}).then((data) => data.sort((prev,curr) => prev.reservation_time < curr.reservation_time? -1:1))
}

const match = (id) => {
  console.log(id, typeof id)
  return knex(table).select("*").where({"reservation_id": id}).then(res=> res[0])
}

const create = (res) => {
return knex(table).insert(res).returning("*").then(res => res[0])
}

const changeStatus = (id, status) => {
  console.log('change status run')
  return knex(table).where({reservation_id: id}).update({status}).returning("*").then(res => res[0])
}

module.exports = {
  read, 
  match,
  create,
  changeStatus
}