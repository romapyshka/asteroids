import express, { Application, Request, Response, NextFunction} from 'express';

const app: Application = express();

app.get('/', (req: Request, res:Response, next: NextFunction) => {
    res.send("Hello world!");

});

const port = process.env.PORT || 80

app.listen(port, () => console.log('Server running'));
