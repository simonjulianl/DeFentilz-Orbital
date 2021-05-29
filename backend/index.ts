import * as mysql from "mysql";
import express from "express";
import LogRocket from "logrocket";
LogRocket.init("iukbut/bonus");

const sql = require("mysql");
// configuring environment variable setting
const dotenv = require("dotenv");
dotenv.config();

// TODO : Add https ssl certificate to prevent CORS issue
// const fs = require('fs');
// const https = require('https');
// const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
// const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

const app = express();
const PORT = 4000;
// const credentials = {
//   key: privateKey,
//   cert: certificate
// }

// const httpsServer = https.createServer(credentials, app)

const con = sql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: parseInt(process.env.RDS_PORT),
  database: process.env.DB_NAME,
});

// establish connection
con.connect((err?: mysql.MysqlError) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

// some api
app.get("/", (req, res) => res.send("BoNUS Server"));

// this cre
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is listening at http://localhost:${PORT}`);
});

con.end((err?: mysql.MysqlError) => {});

export default con;
