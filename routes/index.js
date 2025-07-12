const backend = require('express').Router();
const apiRoutes = require("./api");

backend.use("/api", apiRoutes);


backend.use("/api", (req, res, next) => {
    const error = new Error("Route not found after /api.");
    error.status = 404;
    next(error);
});


backend.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.status || 500,
        message: error.message || "Internal server error",
    });
});

module.exports = backend;
