const backend = require('express').Router();
const middleware= require("../../../Middlewares/LoginMiddleware")
const {getTrainerClasses} = require("../../../controllers/Class/GetClasses")
const {createAClass} = require("../../../controllers/Trainer/CreateAClass")
const {deleteClass} = require("../../../controllers/Class/DeleteClass")
const {getAllClasses} = require("../../../controllers/Class/getallClasses")
const {addGuest} = require("../../../controllers/Class/addGuest")




backend.post("/CreateAClass", createAClass)

backend.get("/GetClassesByTrainerID", getTrainerClasses)

backend.get("/GetAllClasses", getAllClasses)

backend.delete('/DeleteaClass/:meetingLink',deleteClass)

backend.post("/AddGuest",addGuest)

module.exports = backend;