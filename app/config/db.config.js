module.exports = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "0a1b2c3d4e5f",
  DB: "ipcavote",
  dialect: "mssql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
