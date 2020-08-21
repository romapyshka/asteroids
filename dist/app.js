"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// integration with heroku
var port = process.env.PORT || 3000;
var app = express_1.default();
app.use(express_1.default.static("public"));
app.listen(port, function () { return console.log('Server running'); });
// import * as path from "path";
// import express, { Application, Request, Response, NextFunction} from 'express';
//
// const app: Application = express();
//
//
// // app.use("/dist", express.static('./dist/'));
// app.use("/", express.static(path.join(__dirname, 'dist')));
//
//
//
// // app.get('/', function(req, res) {
// //     res.sendFile(path.resolve('./public/index.html'))
// // });
//
//
//
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log('Server running'));
//
