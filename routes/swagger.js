const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("...swagger.json");

router.use("/api-cdocs", swaggerUi.serve);

router.use("/api-cdocs", swaggerUi.setup(swaggerDocument));

module.exports = router;
