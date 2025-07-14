const backend = require('express').Router();
const loginController = require("../../../controllers/loginController");
// const {addAdmin} = require("../../../controllers/Admin/AddAdmin")


backend.post("/login", loginController)

// backend.post("/addADMIN", addAdmin)

module.exports = backend;