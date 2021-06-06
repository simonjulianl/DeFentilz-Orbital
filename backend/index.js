// environment variable
const dotenv = require("dotenv");
dotenv.config();

// sync with the model
const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync the database");
});

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

var corsOptions = {
  // for extension
  origin: "",
};

app.use(cors(corsOptions));

// parse request of content type
app.use(express.json());

// parse request from urlencoded
app.use(express.urlencoded({ extended: true }));

// home page api
app.get("*", (req, res) => res.json({ message: "Welcome to BoNUS Server" }));

require("./routes/facilities.routes")(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is listening at http://localhost:${PORT}`);
});

// TODO : Add https ssl certificate to prevent CORS issue
// const fs = require('fs');
// const https = require('https');
// const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
// const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

// const credentials = {
//   key: privateKey,
//   cert: certificate
// }

// const httpsServer = https.createServer(credentials, app)
