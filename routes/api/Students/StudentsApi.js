const backend = require('express').Router();
const {addStudent}= require('../../../controllers/Students/addStudent')
const {getStudentDetails} = require('../../../controllers/Students/getStudentDetails')


backend.post("/addStudent", addStudent)

backend.get("/StudentDetails", getStudentDetails)

// backend.put("/UpadteStudentDetails")

// backend.delete("/DeleteStudent")

module.exports = backend;