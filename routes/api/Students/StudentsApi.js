const backend = require('express').Router();
const {addStudent}= require('../../../controllers/Students/addStudent')
const {getStudentDetails} = require('../../../controllers/Students/getStudentDetails')
const {deleteStudent}= require("../../../controllers/Students/deleteStudent")

backend.post("/addStudent", addStudent)

backend.get("/StudentDetails", getStudentDetails)

// backend.put("/UpadteStudentDetails")

backend.delete("/DeleteStudent/:StudentId", deleteStudent)

module.exports = backend;