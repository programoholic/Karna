const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const clientPath = path.resolve(__dirname, "..", "dist/karna-ui");
const connection = require("./appconfig");
const logger = require("./logger");
import { scheduleInventoryManagement } from "./services/inventory/scheduler";
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(clientPath));
app.use(cookieParser());
process.stdout.write("Initializing Karna-CCX server ");
// require('./dbsetup');

function welcome() {
  const motdFile = path.resolve(__dirname, ".webapp.motd");
  if (fs.existsSync(motdFile)) {
    const msg = fs.readFileSync(motdFile, "utf-8");
    process.stdout.write(`\n${msg}\n`);
  } else {
    process.stdout.write("\n=========== Karna-CCX WWW ===========\n");
  }
}
welcome();
scheduleInventoryManagement();
// middleware function
app.use((req, res, next) => {
  req.setTimeout(30 * 1000, function () {
    // call back function is called when request timed out.
    console.log("request timeout");
    return res.status(504).send({ message: "Request timeout!" });
  });
  next();
});
app.use("/api/v1", require("./api/v1/"));
app.use(logger, (req, res, next) => {
  next();
});
app.use((req, res) => {
  res.status(404).send({ error: "Resource not found" });
});
logger.debug("app started finally");
module.exports = app;
