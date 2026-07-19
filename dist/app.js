"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @types/packageName -> it has to be install in dev dependencies as it is only used in development not in produection 
// npm i -D @types/Name
//! importing routes 
const routes_1 = __importDefault(require("./routes"));
//*creating app instance
const app = (0, express_1.default)();
//! using middlewares
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
//! using routes 
app.use("/api/v1", routes_1.default);
//  app.use("/api/v1/auth", authRoutes); //here v1 = api version
//  app.use("/api/v2/auth", authRoutes); 
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/brand",brandRoutes);
//* health route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "server is up & running",
        success: true,
        status: "success",
        data: null
    });
});
//! path not found
app.use((req, res, next) => {
    const message = `cannot ${req.method} on ${req.path}`;
    // res.status(404).json({
    //     message,
    //     success: false,
    //     status: "fail",
    //     data: null,
    const error = new Error(message);
    error.status = "fail";
    error.statusCode = 404;
    next(error);
});
//* using error handler
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
