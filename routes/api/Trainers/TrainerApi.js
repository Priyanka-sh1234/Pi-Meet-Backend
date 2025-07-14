const backend = require('express').Router();
const {addTrainer}= require('../../../controllers/Trainer/addTrainer')
const {getTrainerDetails} = require("../../../controllers/Trainer/getTrainerDetails")
const {resetTrainerPassword} = require("../../../utils/passwordResetTrainer")
const {deleteTrainer} = require("../../../controllers/Trainer/deleteTrainer")
const {UpdateTrainer} = require("../../../controllers/Trainer/updateTrainer")
const {adminOnlyMiddleware} = require("../../../Middlewares/AdminOnly")


backend.post("/addTrainer", addTrainer)

backend.post('/reset-password', resetTrainerPassword); 

backend.get("/getTrainerDetails", getTrainerDetails )

backend.put('/updateTrainer/:TrainerId', adminOnlyMiddleware, UpdateTrainer)

backend.delete('/deleteTrainer/:TrainerId', deleteTrainer);

module.exports = backend;