const backend = require('express').Router();
const loginController = require("../../../controllers/loginController");
// const {addAdmin} = require("../../../controllers/Admin/AddAdmin")


backend.get("/login", loginController)

// backend.post("/addADMIN", addAdmin)

module.exports = backend;