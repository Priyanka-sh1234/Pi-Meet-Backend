const backend = require('express').Router();
const loginController = require("../../../controllers/loginController");


backend.post("/login", loginController)

module.exports = backend;