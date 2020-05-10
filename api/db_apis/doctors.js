const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
`select 
  users.userid "doctorId", 
  users.name "doctorName", 
  users.phone "phone", 
  users.email "email",
  doctor.speciality "speciality",
  from users, doctor
  where doctor.doctorid = users.userid`;

async function find(context) {
  let query = baseQuery;

  if (context.id) {
    query += ` AND doctor.doctorid = '${context.id}'`;
  }

  const result = await database.simpleExecute(query, {});
  
  return result.rows;
}

module.exports.find = find;

const findAllSql = 
`select 
  users.userid "doctorId", 
  users.name "doctorName", 
  users.phone "phone", 
  users.email "email",
  doctor.speciality "speciality"
  from users, doctor
  where doctor.doctorid = users.userid`;

  async function findAll() {
    let query = findAllSql;
    const result = await database.simpleExecute(query, {});
    
    return result.rows;
  }
  
  module.exports.findAll = findAll;

const createSql =
  `insert into doctor (
    doctorid,
    speciality
  ) values (
    :doctorid,
    :speciality
  )`;

async function create(doc) {
  const doctor = Object.assign({}, doc);

  const result = await database.simpleExecute(createSql, doctor);
  console.log("here");
  if (result.rowsAffected && result.rowsAffected === 1) {
    return doctor;
  } else {
    return null;
  }
}

module.exports.create = create;

const updateSql =
 `update doctor
  set speciality = :speciality
  where doctorid = :doctorid`;

async function update(doc) {
  const doctor = Object.assign({}, doc);
  const result = await database.simpleExecute(updateSql, doctor);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return doctor;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
    delete from doctor
    where doctorid = :doctorid;
    :rowcount := sql%rowcount;
  end;`;

async function del(id) {
  const binds = {
    doctorid: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
