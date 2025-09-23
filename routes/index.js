const routes = require("express").Router();
routes.use("/students", require("./students"));

routes.use("/auth", require("./auth"));

routes.use("/course", require("./courses"));

routes.use("/instructor", require("./instructors"));

module.exports = routes;
