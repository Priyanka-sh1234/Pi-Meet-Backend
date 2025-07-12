const backend = require('express').Router();
const loginController = require("../../../controllers/loginController");


backend.get("/login", loginController)

module.exports = backend;