"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @types/packageName -> it has to be install in dev dependencies as it is only used in development not in produection 
// npm i -D @types/Name
//*creating app instance
const app = (0, express_1.default)();
//! using middlewares
//! using routes 
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
    res.status(404).json({
        message,
        success: false,
        status: "fail",
        data: null,
    });
});
exports.default = app;
