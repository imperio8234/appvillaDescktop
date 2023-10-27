const sqlite = require("sqlite3");
const path = require("path");
const {app} =require("electron")
const appDataPath = app.getAppPath("userData");
const dbPath = path.join(appDataPath, "data.db");
// function for create databases 

exports.conexion = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.log("error en la conexion")
    } else {
        console.log("conexion exitosa")
    }
});