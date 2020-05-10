const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
`select 
  users.userid "patientId", 
  users.name "patientName", 
  users.phone "phone", 
  patient.address "address", 
  patient.sex "sex", 
  patient.dob  "dob"
  from users, patient
  where patient.patientid = users.userid`;

async function find(context) {
  let query = baseQuery;

  if (context.id) {
    query += ` AND patient.patientid = '${context.id}'`;
  }

  const result = await database.simpleExecute(query, {});
  
  return result.rows;
}

module.exports.find = find;

const findAllSql = 
`select 
  patient.patientid "patientId", 
  users.name "patientName", 
  users.phone "phone", 
  patient.address "address", 
  patient.sex "sex", 
  patient.dob  "dob"
  from patient, users
  where patient.patientid = users.userid`;

  async function findAll() {
    let query = findAllSql;
    const result = await database.simpleExecute(query, {});
    
    return result.rows;
  }
  
  module.exports.findAll = findAll;

const createSql =
  `insert into patient (
    patientid,
    address,
    sex,
    dob
  ) values (
    :patientid,
    :address,
    :sex,
    :dob
  )`;

async function create(p) {
  const patient = Object.assign({}, p);

  const result = await database.simpleExecute(createSql, patient);

  // patient.patientid = result.outBinds.patientid[0];

  return patient;
}

module.exports.create = create;

const updateSql =
 `update patient
  set address = :address,
    sex = :sex,
    dob = :dob
  where patientid = :patientid`;

async function update(p) {
  const patient = Object.assign({}, p);
  const result = await database.simpleExecute(updateSql, patient);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return patient;
  } else {
    return null;
  }
}

module.exports.update = update;

// TODO: What is job_history?
 // We need to delete patientid from any table that references patient (cascade)
const deleteSql =
 `begin
    delete from job_history
    where patientid = :patientid;
    delete from patient
    where patientid = :patientid;
    :rowcount := sql%rowcount;
  end;`;

async function del(id) {
  const binds = {
    patientid: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
