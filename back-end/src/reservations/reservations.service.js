const knex = require("../db/connection");
const table = "reservations";

const read = (date) => {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .then((data) =>
      data.sort((prev, curr) =>
        prev.reservation_time < curr.reservation_time ? -1 : 1
      )
    );
};

const match = (id) => {
  return knex(table)
    .select("*")
    .where({ reservation_id: id })
    .then((res) => res[0]);
};

const create = (res) => {
  return knex(table)
    .insert(res)
    .returning("*")
    .then((res) => res[0]);
};

const listByNum = (mobile_number) => {
  return knex(table)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
};

const changeStatus = (id, status) => {
  return knex(table)
    .where({ reservation_id: id })
    .update({ status })
    .returning("*")
    .then((res) => res[0]);
};

const update = (res) => {
  return knex(table)
  .where({reservation_id: res.reservation_id})
  .update(res)
  .returning("*")
  .then((res)=> res[0])
}

module.exports = {
  read,
  match,
  create,
  update,
  listByNum,
  changeStatus,
};
