module.exports = {
  HOST: "ipcavote.database.windows.net",
  USER: "ipcavote",
  PASSWORD: "0a1b2c3d4e5f_",
  DB: "ipcavote",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
