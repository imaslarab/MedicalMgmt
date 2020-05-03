module.exports = {
  hrPool: {
    user: "agalphonsus",
    password: "AGALPHONSUS",
    connectString: "(DESCRIPTION = (ADDRESS_LIST =" +
    "(ADDRESS = (PROTOCOL = TCP)(Host = oracle.WPI.EDU)(Port = 1521)))(CONNECT_DATA =(SID = ORCL)))",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};