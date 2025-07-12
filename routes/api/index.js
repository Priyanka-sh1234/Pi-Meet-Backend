const backend = require("express").Router();
const authRoutes = require("./auth/LoginApi")
const trainerRoutes = require("./Trainers/TrainerApi")
const StudentRoutes = require("./Students/StudentsApi")
const ClassesRoutes = require('./Classes/ClassesApi')


backend.use("/auth", authRoutes);

backend.use("/trainer", trainerRoutes)

backend.use("/Student",StudentRoutes)

backend.use("/Classes", ClassesRoutes)

module.exports = backend;