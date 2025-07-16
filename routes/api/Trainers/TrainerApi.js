const backend = require('express').Router();
const {addTrainer}= require('../../../controllers/Trainer/addTrainer')
const {getTrainerDetails} = require("../../../controllers/Trainer/getTrainerDetails")
const {resetTrainerPassword} = require("../../../utils/passwordResetTrainer")
const {deleteTrainer} = require("../../../controllers/Trainer/deleteTrainer")
const {UpdateTrainer} = require("../../../controllers/Trainer/updateTrainer")
const {adminOnlyMiddleware} = require("../../../Middlewares/AdminOnly")
const {UpdateActiveStatus} = require("../../../controllers/Trainer/ChangeStatus")
const {getAllTrainers} = require("../../../controllers/Trainer/GetAllTrainers")
const {AddGuest} = require("../../../controllers/Trainer/addGuest")


backend.post("/addTrainer", addTrainer)

backend.get("/GetAllTrainers",getAllTrainers)

backend.post('/reset-password', resetTrainerPassword); 

backend.get("/getTrainerDetails", getTrainerDetails )

backend.put('/updateTrainer/:TrainerId', adminOnlyMiddleware, UpdateTrainer)

backend.delete('/deleteTrainer/:TrainerId', deleteTrainer);

backend.patch('/TrainerStatus/:TrainerId', adminOnlyMiddleware, UpdateActiveStatus);

backend.post("/AddGuest",AddGuest)

module.exports = backend;