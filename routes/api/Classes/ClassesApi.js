const backend = require('express').Router();
const middleware= require("../../../Middlewares/LoginMiddleware")
const {getTrainerClasses} = require("../../../controllers/Class/GetClasses")
const {createAClass} = require("../../../controllers/Trainer/CreateAClass")


backend.post("/CreateAClass", createAClass)

backend.get("/GetClassesByTrainerID", getTrainerClasses)


// backend.put("/UpdateClassData")

// backend.delete('/DeleteaClass')


module.exports = backend;