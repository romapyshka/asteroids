import express from "express";

// integration with heroku
const port = process.env.PORT || 9000;
const app = express();

app.use(express.static(`public`));
app.listen(port, () => console.log('Server running'));




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