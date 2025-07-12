const backend = require('express').Router();
const {addTrainer}= require('../../../controllers/Trainer/addTrainer')
const {getTrainerDetails} = require("../../../controllers/Trainer/getTrainerDetails")
const {resetTrainerPassword} = require("../../../utils/passwordResetTrainer")
const {deleteTrainer} = require("../../../controllers/Trainer/deleteTrainer")


backend.post("/addTrainer", addTrainer)

backend.post('/reset-password', resetTrainerPassword); 

backend.get("/getTrainerDetails", getTrainerDetails )

// backend.update("/UpadateTrainer")

backend.delete('/deleteTrainer/:TrainerId', deleteTrainer);

module.exports = backend;