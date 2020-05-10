const oracledb = require('oracledb');
const database = require('../services/database.js');

const createSql =
  `insert into employee (
    userid
  ) values (
    :userid
  )`;

async function create(emp) {
  const employee = Object.assign({}, emp);

  const result = await database.simpleExecute(createSql, employee);
  
  if (result.rowsAffected && result.rowsAffected === 1) {
    return result;
  } else {
    return null;
  }
}

module.exports.create = create;

const deleteSql =
 `begin
    delete from employee
    where userid = :userid;
    :rowcount := sql%rowcount;
  end;`;

async function del(id) {
  const binds = {
    userid: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
