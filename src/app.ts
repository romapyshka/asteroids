import express, { Application, Request, Response, NextFunction} from 'express';

const app: Application = express();
const path = require('path');

app.use("/dist", express.static('./dist/'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve('./index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running'));

