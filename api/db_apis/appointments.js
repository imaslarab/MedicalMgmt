const oracledb = require('oracledb');
const database = require('../services/database.js');

const findAllSql =
    `select 
    appointment.patientid "patientId", 
    appointment.doctorid "doctorId", 
    appointment.appoint_date "appointDate"
    from appointment`;

async function findAll() {
    let query = findAllSql;
    console.log("query: " + findAllSql);
    const result = await database.simpleExecute(query, {});

    return result.rows;
}

module.exports.findAll = findAll;


const baseQuery =
    `select 
  appointment.patientid "patientId", 
  appointment.doctorid "doctorId", 
  appointment.appoint_date "appointDate"
  from appointment`;

async function find(context) {
    let query = baseQuery;

    if (context.patientid)
        query += `\nWHERE appointment.patientid = '${context.patientid}'`;
    else if (context.doctorid)
        query += `\nWHERE appointment.doctorid = '${context.doctorid}'`;

    const result = await database.simpleExecute(query, {});

    return result.rows;
}

module.exports.find = find;

const createSql =
    `insert into appointment (
    patientID,
    doctorID,
    appoint_date
  ) values (
    :patientID,
    :doctorID,
    :appoint_date
  )`;

async function create(p) {
    const appointment = Object.assign({}, p);
    const result = await database.simpleExecute(createSql, appointment);

    // patient.patientid = result.outBinds.patientid[0];

    return appointment;
}

module.exports.create = create;

// const updateSql =
//     `update patient
//   set address = :address,
//     sex = :sex,
//     dob = :dob
//   where patientid = :patientid`;
//
// async function update(p) {
//     const patient = Object.assign({}, p);
//     const result = await database.simpleExecute(updateSql, patient);
//
//     if (result.rowsAffected && result.rowsAffected === 1) {
//         return patient;
//     } else {
//         return null;
//     }
// }
//
// module.exports.update = update;
//

// const deleteSqlTest =
//     `begin
//     delete from appointment
//     where patientid = :patientid;
//     :rowcount := sql%rowcount;
//   end;`;
//
// const deleteDoctorAppSql =
//     `begin
//     delete from appointment
//     where doctorid = :doctorid;
//     :rowcount := sql%rowcount;
//   end;`;

// const delSqlStart =
//     `begin
//     delete from visitdetail
//     `;
//
// const delSqlEnd =
//     `:rowcount := sql%rowcount;
//   end;`;

async function del(context) {
    const binds = {
        rowcount: {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        }
    };
    let condition = ``;

    if (context.patientid) {
        binds.patientid = context.patientid;
        condition = `where patientid = :patientid;\n`;
    }
    else if (context.doctorid) {
        binds.doctorid = context.doctorid;
        condition = `where doctorid = :doctorid;\n`;
    }

    const delSql =
        `begin
        delete from visitdetail
        ` + condition
        + `delete from appointment
        ` + condition
        + `:rowcount := sql%rowcount;
        end;`;

    console.log("Query: " + delSql);
    console.log(binds);
    const result = await database.simpleExecute(delSql, binds);
    console.log(result);

    return result.outBinds.rowcount >= 1;
}

module.exports.delete = del;
